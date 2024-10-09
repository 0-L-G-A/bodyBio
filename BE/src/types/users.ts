export enum UserRole {
    SUPER_ADMIN = "super_admin",
    ADMIN = "admin",
    DOCTOR = "doctor",
    PATIENT = "patient",
    TRUST_PERSON = "trust_person",
}

export type UserParams = {
    id: string;
    name: string;
    surname: string;
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