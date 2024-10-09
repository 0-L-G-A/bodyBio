import { UserRole } from "@app/types/users";
import { IsEmail, MaxLength, MinLength } from "class-validator";

import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ unique: true })  // Email повинен бути унікальним
    @IsEmail({}, {message: 'Use correct email'})
    email: string;

    @Column({ select: false })  // Пароль не буде включений у вибірку за замовчуванням
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
}