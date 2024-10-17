import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Appointment } from "./UsersAppointment";
import { AppointmentRecordType } from "@app/types/appointment";

@Entity({ name: 'users_diagnoze' })
export class UsersDiagnozes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Appointment, (appointment) => appointment.usersDiagnozes, { nullable: false })
  @JoinColumn({ name: 'appointmentId' })
  appointment: Appointment;

  @ManyToOne(() => User, (user) => user.usersDiagnozes, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: false })
  bodySystemId: string;

  @Column({ nullable: false })
  parentDiagnosisId: string;

  @Column({ nullable: false })
  childDiagnosisId: string;

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
    default: AppointmentRecordType.DIAGNOZE,
  })
  recordType: AppointmentRecordType;
}