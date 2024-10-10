import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class DoctorsSpecsDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsUUID()
    bodySystemId: string; // Зовнішній ключ для зв'язку з BodySystem
}