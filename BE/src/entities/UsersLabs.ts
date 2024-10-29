import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Appointment } from "./UsersAppointment";
import { AppointmentRecordType } from "@app/types/appointment";

@Entity({ name: 'users_lab' })
export class UsersLabs {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Appointment, (appointment) => appointment.usersLabs, { nullable: false })
  @JoinColumn({ name: 'appointmentId' })
  appointment: Appointment;

  @ManyToOne(() => User, (user) => user.usersLabs, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: false })
  bodySystemId: string;

  @Column({ nullable: true })
  parentLabId: string;

  @Column({ nullable: true })
  childLabId: string;

  @Column('simple-array', { nullable: true })
  linkedImages: string[];

  @Column('simple-array', { nullable: true })
  linkedFiles: string[];

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: AppointmentRecordType,
    default: AppointmentRecordType.LAB,
  })
  recordType: AppointmentRecordType;
}