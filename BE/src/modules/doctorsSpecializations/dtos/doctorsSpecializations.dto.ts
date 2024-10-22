import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class DoctorsSpecsDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    nameKey: string;
  
    @IsNotEmpty()
    @IsUUID()
    bodySystemId: string;
}