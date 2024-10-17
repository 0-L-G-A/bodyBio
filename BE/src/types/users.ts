export enum UserRole {
    SUPER_ADMIN = "super_admin",
    ADMIN = "admin",
    DOCTOR = "doctor",
    PATIENT = "patient",
    TRUST_PERSON = "trust_person",
}

export enum PreferedLanguages {
    ENG = "ENG", // English
    ES = "ES", // Spanish
    UA = "UA", // Ukrainian
    BG = "BG", // Bulgarian
    DE = "DE", // German
    FR = "FR", // French
    HU = "HU", // Hungarian
    PL = "PL", // Polish
    TR = "TR", // Turkish
    CZ = "CZ", // Czech
    ZH = "ZH", // Chinese
    AR = "AR", // Arabic
}

export type UserParams = {
    id?: string;
    name: string;
    surname: string;
    role: UserRole;
    email: string;
    password: string;
    contactNumber: string;
    insuranceId?: string;
    createdAt?: Date;
    patientsIds?: string[];
    doctorsIds?: string[];
    adminsIds?: string[];
    trustPersonsIds?: string[];
    isAlive?: boolean;
    sex?: string;
}