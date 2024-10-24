import { PreferedLanguages, UserRole } from "@app/types/users";
import { IsEmail, MaxLength, MinLength } from "class-validator";

import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./UsersAppointment";
import { UsersLabs } from "./UsersLabs";
import { UsersDiagnozes } from "./UsersDiagnozes";
import { UsersFinding } from "./UsersFindings";

@Entity({name: 'users'})
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable: false})
    @MinLength(1, { message: 'Name is too short'})
    @MaxLength(30, { message: 'Name is too long'})
    name: string;

    @Column({nullable: false})
    @MinLength(1, { message: 'Surname is too short'})
    @MaxLength(30, { message: 'Surname is too long'})
    surname: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.PATIENT,
    })
    role: UserRole;

    @Column({ unique: true })
    @IsEmail({}, {message: 'Use correct email'})
    email: string;

    @Column({ select: false })
    password: string;

    @Column({nullable: true})
    contactNumber: string;

    @Column({nullable: true})
    insuranceId: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column("simple-array", { nullable: true })
    patientsIds: string[] | null;

    @Column("simple-array", { nullable: true })
    doctorsIds: string[] | null;

    @Column("simple-array", { nullable: true })
    adminsIds: string[] | null;

    @Column("simple-array", { nullable: true })
    trustPersonsIds: string[] | null;

    @Column({ nullable: true })
    isAlive: boolean | null;

    @Column({ nullable: true })
    sex: string | null;

    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments: Appointment[];

    @OneToMany(() => UsersLabs, (userLab) => userLab.user)
    usersLabs: UsersLabs[];

    @OneToMany(() => UsersDiagnozes, (usersDiagnoze) => usersDiagnoze.user)
    usersDiagnozes: UsersDiagnozes[];

    @OneToMany(() => UsersFinding, (usersFinding) => usersFinding.user)
    usersFindings: UsersFinding[];

    @Column({
        type: "enum",
        enum: PreferedLanguages,
        default: PreferedLanguages.ENG,
    })
    preferedLanguage: PreferedLanguages;
}