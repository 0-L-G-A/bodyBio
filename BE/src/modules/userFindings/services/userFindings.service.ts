import { CreateUsersFindingsDto } from "../dtos/userFindings.dto";
import { AppointmentRecordType } from "@app/types/appointment";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Appointment } from "@app/entities/UsersAppointment";
import { User } from "@app/entities/User";
import { UsersFinding } from "@app/entities/UsersFindings";

@Injectable()
export class UsersFindingsService {
  constructor(
    @InjectRepository(UsersFinding)
    private usersFindingsRepository: Repository<UsersFinding>,
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createDto: CreateUsersFindingsDto): Promise<UsersFinding> {
    const { userId, appointmentId, bodySystemId, parentFindingId, childFindingId, linkedImages, linkedFiles, notes } = createDto;

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const appointment = await this.appointmentsRepository.findOne({ where: { id: appointmentId } });

    if (!user || !appointment) {
      throw new Error('User or Appointment not found');
    }

    const newUsersFindings = this.usersFindingsRepository.create({
      user,
      appointment,
      bodySystemId,
      parentFindingId,
      childFindingId,
      linkedImages,
      linkedFiles,
      notes,
      recordType: AppointmentRecordType.FINDING,
      createdAt: new Date(),
    });

    return this.usersFindingsRepository.save(newUsersFindings);
  }

  async findAllByUserIdAndBodySystem(userId: string, bodySystemId?: string): Promise<UsersFinding[]> {
    const queryOptions: any = { user: { id: userId } };
  
    if (bodySystemId) {
      queryOptions.bodySystemId = bodySystemId;
    }
  
    return this.usersFindingsRepository.find({
      where: queryOptions,
      relations: ['user', 'appointment'],
    });
  }

  async findOne(id: string): Promise<UsersFinding | null> {
    return this.usersFindingsRepository.findOne({
      where: { id },
      relations: ['user', 'appointment'],
    });
  }

  async edit(id: string, updateDto: Partial<CreateUsersFindingsDto>): Promise<UsersFinding> {
    const usersFindings = await this.findOne(id);

    if (!usersFindings) {
      throw new Error('UsersFinding record not found');
    }

    Object.assign(usersFindings, updateDto);

    return this.usersFindingsRepository.save(usersFindings);
  }

  async delete(id: string): Promise<void> {
    const usersFinding = await this.findOne(id);

    if (!usersFinding) {
      throw new Error('UsersFinding record not found');
    }

    await this.usersFindingsRepository.remove(usersFinding);
  }
}