import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUsersLabsDto {
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
  parentLabId: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  childLabId: string;

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