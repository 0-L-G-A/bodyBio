import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class FindingDto {
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
    bodySystemId: string;

    @IsOptional()
    @IsUUID()
    parentId?: string;
}