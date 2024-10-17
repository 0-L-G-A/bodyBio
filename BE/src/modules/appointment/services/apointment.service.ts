import { Appointment } from "@app/entities/UsersAppointment";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreateAppointmentDto } from "../dtos/apointment.dto";
import { User } from "@app/entities/User";
import { UsersLabs } from "@app/entities/UsersLabs";
// import { UsersDiagnozes } from "@app/entities/UsersDiagnozes";
// import { UsersFinding } from "@app/entities/UsersFindings";


@Injectable()
export class UsersAppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private usersAppointmentRepository: Repository<Appointment>,
    // @InjectRepository(UsersFinding)
    // private usersFindingsRepository: Repository<UsersFinding>,
    // @InjectRepository(UsersDiagnozes)
    // private usersDiagnozesRepository: Repository<UsersDiagnozes>,
    @InjectRepository(UsersLabs)
    private usersLabsRepository: Repository<UsersLabs>,
  ) {}

  async create(createDto: CreateAppointmentDto): Promise<Appointment> {
    const appointment = this.usersAppointmentRepository.create({
      user: { id: createDto.user } as User,
      author: { id: createDto.author } as User,
      usedBodySystems: createDto.usedBodySystems,
      creationDate: new Date(), 
      usersFindings: [],
      usersDiagnozes: [],
      usersLabs: []
    });

    return this.usersAppointmentRepository.save(appointment);
  }

  async findAllByUserIdAndBodySystem(userId: string, bodySystemId?: string): Promise<Appointment[]> {
    const query = this.usersAppointmentRepository.createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.user', 'user')
      .leftJoinAndSelect('appointment.author', 'author')
      .leftJoinAndSelect('appointment.usersFindings', 'usersFindings')
      .leftJoinAndSelect('appointment.usersDiagnozes', 'usersDiagnozes')
      .leftJoinAndSelect('appointment.usersLabs', 'usersLabs')
      .where('user.id = :userId', { userId });
  
    if (bodySystemId) {
      query.andWhere(':bodySystemId = ANY(appointment.usedBodySystems)', { bodySystemId });
    }
  
    return query.getMany();
  }

  async findOne(id: string): Promise<Appointment | null> {
    return this.usersAppointmentRepository.findOne({
      where: { id },
      relations: ['user', 'author', 'usersFindings', 'usersDiagnozes', 'usersLabs'],
    });
  }

  async edit(id: string, updateDto: CreateAppointmentDto): Promise<Appointment | null> {
    const appointment = await this.findOne(id);
    if (!appointment) {
      return null;
    }

    // Updating main data
    //@ts-ignore
    appointment.user = updateDto.user;
    //@ts-ignore
    appointment.author = updateDto.author;
    appointment.usedBodySystems = updateDto.usedBodySystems;

    // // Updating related findings
    // if (updateDto.usersFindings.length) {
    //   appointment.usersFindings = await this.usersFindingsRepository.findBy({
    //     id: In(updateDto.usersFindings),
    //   });
    // }

    // // Updating related diagnoses
    // if (updateDto.usersDiagnozes.length) {
    //   appointment.usersDiagnozes = await this.usersDiagnozesRepository.findBy({
    //     id: In(updateDto.usersDiagnozes),
    //   });
    // }

    // Updating related labs
    if (updateDto.usersLabs.length) {
      appointment.usersLabs = await this.usersLabsRepository.findBy({
        id: In(updateDto.usersLabs),
      });
    }

    return this.usersAppointmentRepository.save(appointment);
  }

  async delete(id: string): Promise<void> {
    const appointment = await this.findOne(id);
    if (appointment) {
      // await this.usersFindingsRepository.remove(appointment.usersFindings);
      // await this.usersDiagnozesRepository.remove(appointment.usersDiagnozes);
      await this.usersLabsRepository.remove(appointment.usersLabs);

      await this.usersAppointmentRepository.remove(appointment);
    }
  }
}