import { IsNotEmpty, IsString, IsOptional, IsUUID, IsEnum } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'Task title is required' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsUUID()
  @IsNotEmpty({ message: 'Project ID is required' })
  projectId: string;

  @IsUUID()
  @IsOptional()
  userId?: string;
}