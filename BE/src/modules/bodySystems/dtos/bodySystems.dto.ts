import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class BodySystemDto {
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    nameKey: string;

    @IsNotEmpty()
    level: number;

    @IsNotEmpty()
    @IsUUID()
    bodySystemId: string;
}