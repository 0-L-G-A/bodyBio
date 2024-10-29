import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUsersDiagnozesDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  appointmentId: string;

  @IsNotEmpty()
  @IsString()
  bodySystemId: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  parentDiagnozeId: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  childDiagnozeId: string;

  @IsOptional()
  @IsArray()
  linkedImages?: string[];

  @IsOptional()
  @IsArray()
  linkedFiles?: string[];

  @IsOptional()
  @IsString()
  notes?: string;
}