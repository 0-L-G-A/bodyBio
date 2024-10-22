import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUsersFindingsDto {
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
  parentFindingId: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  childFindingId: string;

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