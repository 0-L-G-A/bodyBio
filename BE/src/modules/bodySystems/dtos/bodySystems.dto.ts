import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class BodySystemDto {
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    nameKey: string;

    @IsNotEmpty()
    level: number; // Рівень ієрархії

    @IsNotEmpty()
    @IsUUID()
    bodySystemId: string; // Зовнішній ключ для зв'язку з іншими ентіті
}