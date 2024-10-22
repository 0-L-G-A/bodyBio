import { UsersLabs } from "@app/entities/UsersLabs";
import { AppointmentRecordType } from "@app/types/appointment";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Appointment } from "@app/entities/UsersAppointment";
import { User } from "@app/entities/User";
import { UsersDiagnozes } from "@app/entities/UsersDiagnozes";
import { CreateUsersDiagnozesDto } from "../dtos/userDiagnozes.dto";

@Injectable()
export class UsersDiagnozesService {
  constructor(
    @InjectRepository(UsersDiagnozes)
    private usersDiagnozesRepository: Repository<UsersDiagnozes>,
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createDto: CreateUsersDiagnozesDto): Promise<UsersDiagnozes> {
    const { userId, appointmentId, bodySystemId, parentDiagnozeId, childDiagnozeId, linkedImages, linkedFiles, notes } = createDto;

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const appointment = await this.appointmentsRepository.findOne({ where: { id: appointmentId } });

    if (!user || !appointment) {
      throw new Error('User or Appointment not found');
    }

    const newUserDiasnozes = this.usersDiagnozesRepository.create({
      user,
      appointment,
      bodySystemId,
      parentDiagnozeId,
      childDiagnozeId,
      linkedImages,
      linkedFiles,
      notes,
      recordType: AppointmentRecordType.DIAGNOZE,
      createdAt: new Date(),
    });

    return this.usersDiagnozesRepository.save(newUserDiasnozes);
  }

  async findAllByUserIdAndBodySystem(userId: string, bodySystemId?: string): Promise<UsersDiagnozes[]> {
    const queryOptions: any = { user: { id: userId } };
  
    if (bodySystemId) {
      queryOptions.bodySystemId = bodySystemId;
    }
  
    return this.usersDiagnozesRepository.find({
      where: queryOptions,
      relations: ['user', 'appointment'],
    });
  }

  async findOne(id: string): Promise<UsersDiagnozes | null> {
    return this.usersDiagnozesRepository.findOne({
      where: { id },
      relations: ['user', 'appointment'],
    });
  }

  async edit(id: string, updateDto: Partial<CreateUsersDiagnozesDto>): Promise<UsersDiagnozes> {
    const usersDiagnozes = await this.findOne(id);

    if (!usersDiagnozes) {
      throw new Error('usersDiagnozes record not found');
    }

    Object.assign(usersDiagnozes, updateDto);

    return this.usersDiagnozesRepository.save(usersDiagnozes);
  }

  async delete(id: string): Promise<void> {
    const usersDiagnozes = await this.findOne(id);

    if (!usersDiagnozes) {
      throw new Error('usersDiagnozes record not found');
    }

    await this.usersDiagnozesRepository.remove(usersDiagnozes);
  }
}