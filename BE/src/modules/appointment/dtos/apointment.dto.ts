import { IsArray, IsNotEmpty, IsString } from "class-validator";


export class CreateAppointmentDto {
    @IsNotEmpty()
    @IsString()
    user: string;
  
    @IsNotEmpty()
    @IsString()
    author: string;
  
    @IsArray()
    usedBodySystems: string[];
  
    @IsArray()
    usersFindings: string[];
  
    @IsArray()
    usersDiagnozes: string[];
  
    @IsArray()
    usersLabs: string[];
  }