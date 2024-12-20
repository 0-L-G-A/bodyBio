import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class DiagnozeDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    nameKey: string;

    @IsNotEmpty()
    @IsNumber()
    level: number;

    @IsNotEmpty()
    @IsUUID()
    bodySystemId: string; // Зовнішній ключ для BodySystem

    @IsOptional()
    @IsUUID()
    parentId?: string; // Зовнішній ключ для Parent (опціональний)
}