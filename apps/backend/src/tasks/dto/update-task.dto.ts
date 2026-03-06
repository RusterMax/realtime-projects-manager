import { IsString, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { Status } from '@prisma/client';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @IsUUID()
  @IsOptional()
  assignedTo?: string;
}