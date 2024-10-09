import { UserRole } from "src/types/users";

export class CreateUserDto {
    name: string;
    surname: string;
    id: string;
    role: UserRole;
    email: string;
    password: string;
    contactNumber: string;
    insuranceId: string;
    createdAt: Date;
    patientsIds: string[];
    doctorsIds: string[];
    adminsIds: string[];
    trustPersonsIds: string[];
    isAlive: boolean;
    sex: string;
}

export class UpdateUserDto {
    name: string;
    surname: string;
    id: string;
    role: UserRole;
    email: string;
    password: string;
    contactNumber: string;
    insuranceId: string;
    createdAt: Date;
    patientsIds: string[];
    doctorsIds: string[];
    adminsIds: string[];
    trustPersonsIds: string[];
    isAlive: boolean;
    sex: string;
}