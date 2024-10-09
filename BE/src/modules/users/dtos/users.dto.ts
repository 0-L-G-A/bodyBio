import { UserRole } from "@app/types/users";
import { IsBoolean, IsEmail, IsEnum, IsOptional, MaxLength, MinLength } from "class-validator";


export class UserDto {
    @MinLength(1, { message: 'Name is too short' })
    @MaxLength(30, { message: 'Name is too long' })
    name: string;

    @MinLength(1, { message: 'Surname is too short' })
    @MaxLength(30, { message: 'Surname is too long' })
    surname: string;

    @IsEmail({}, {message: 'Use correct email'})
    email: string;

    @MinLength(8, { message: 'Password is too short' })
    @MaxLength(20, { message: 'Password is too long' })
    password: string;

    contactNumber: string;

    @IsOptional()
    insuranceId?: string;

    @IsEnum(UserRole)
    role: UserRole;

    @IsOptional()
    patientsIds?: string[];

    @IsOptional()
    doctorsIds?: string[];

    @IsOptional()
    adminsIds?: string[];

    @IsOptional()
    trustPersonsIds?: string[];

    @IsBoolean()
    @IsOptional()
    isAlive?: boolean;

    @IsOptional()
    sex?: string;
}