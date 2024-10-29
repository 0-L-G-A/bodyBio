import { UsersLabs } from "@app/entities/UsersLabs";
import { CreateUsersLabsDto } from "../dtos/userLabs.dto";
import { AppointmentRecordType } from "@app/types/appointment";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Appointment } from "@app/entities/UsersAppointment";
import { User } from "@app/entities/User";

@Injectable()
export class UsersLabsService {
  constructor(
    @InjectRepository(UsersLabs)
    private usersLabsRepository: Repository<UsersLabs>,
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Method to create a new UsersLabs record
  async create(createDto: CreateUsersLabsDto): Promise<UsersLabs> {
    const { userId, appointmentId, bodySystemId, parentLabId, childLabId, linkedImages, linkedFiles, notes } = createDto;

    // Find the associated user and appointment
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const appointment = await this.appointmentsRepository.findOne({ where: { id: appointmentId } });

    if (!user || !appointment) {
      throw new Error('User or Appointment not found');
    }

    // Create new UsersLabs record
    const newUsersLabs = this.usersLabsRepository.create({
      user,
      appointment,
      bodySystemId,
      parentLabId,
      childLabId,
      linkedImages,
      linkedFiles,
      notes,
      recordType: AppointmentRecordType.LAB,
      createdAt: new Date(),
    });

    return this.usersLabsRepository.save(newUsersLabs);
  }

  async findAllByUserIdAndBodySystem(userId: string, bodySystemId?: string): Promise<UsersLabs[]> {
    const queryOptions: any = { user: { id: userId } };
  
    if (bodySystemId) {
      queryOptions.bodySystemId = bodySystemId;
    }
  
    return this.usersLabsRepository.find({
      where: queryOptions,
      relations: ['user', 'appointment'],
    });
  }

  // Find a single UsersLabs record by ID
  async findOne(id: string): Promise<UsersLabs | null> {
    return this.usersLabsRepository.findOne({
      where: { id },
      relations: ['user', 'appointment'],
    });
  }

  // Edit a UsersLabs record
  async edit(id: string, updateDto: Partial<CreateUsersLabsDto>): Promise<UsersLabs> {
    const usersLabs = await this.findOne(id);

    if (!usersLabs) {
      throw new Error('UsersLabs record not found');
    }

    Object.assign(usersLabs, updateDto);

    return this.usersLabsRepository.save(usersLabs);
  }

  // Delete a UsersLabs record
  async delete(id: string): Promise<void> {
    const usersLabs = await this.findOne(id);

    if (!usersLabs) {
      throw new Error('UsersLabs record not found');
    }

    await this.usersLabsRepository.remove(usersLabs);
  }
}