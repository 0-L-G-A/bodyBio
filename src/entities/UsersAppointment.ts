import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { UsersFinding } from "./UsersFindings";
import { UsersDiagnozes } from "./UsersDiagnozes";
import { UsersLabs } from "./UsersLabs";

@Entity({ name: 'users_appointment' })
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.appointments, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'authorId' })
  author: User;

  @CreateDateColumn()
  creationDate: Date;

  @Column("simple-array", { nullable: true })
  usedBodySystems: string[];

  @OneToMany(() => UsersFinding, (usersFinding) => usersFinding.appointment)
  usersFindings: UsersFinding[];

  @OneToMany(() => UsersDiagnozes, (usersDiagnozes) => usersDiagnozes.appointment)
  usersDiagnozes: UsersDiagnozes[];

  @OneToMany(() => UsersLabs, (usersLabs) => usersLabs.appointment)
  usersLabs: UsersLabs[];
}