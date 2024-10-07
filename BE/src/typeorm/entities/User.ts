import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    SUPER_ADMIN = "super_admin",
    ADMIN = "admin",
    DOCTOR = "doctor",
    PATIENT = "patient",
    TRUST_PERSON = "trust_person",
}

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

    @Column()
    @IsEmail({}, {message: 'Use corect email'})
    email: string

    @Column()
    @MinLength(8, { message: 'Password is too short'})
    @MaxLength(20, { message: 'Password is too long'})
    password: string;

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
}