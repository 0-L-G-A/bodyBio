import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Appointment } from "./UsersAppointment";
import { AppointmentRecordType } from "@app/types/appointment";

@Entity({ name: 'users_finding' })
export class UsersFinding {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Appointment, (appointment) => appointment.usersFindings, { nullable: false })
  @JoinColumn({ name: 'appointmentId' })
  appointment: Appointment;

  @ManyToOne(() => User, (user) => user.usersFindings, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: false })
  bodySystemId: string;

  @Column({ nullable: false })
  parentFindingId: string;

  @Column({ nullable: false })
  childFindingId: string;

  @Column('simple-array', { nullable: true })
  linkedImages: string[];

  @Column('simple-array', { nullable: true })
  linkedFiles: string[];

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: "enum",
    enum: AppointmentRecordType,
    default: AppointmentRecordType.FINDING,
  })
  recordType: AppointmentRecordType;
}