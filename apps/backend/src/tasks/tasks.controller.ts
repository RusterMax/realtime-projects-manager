import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTaskDto: CreateTaskDto) {
    const task = await this.tasksService.create(createTaskDto);
    return {
      success: true,
      data: task,
      message: 'Task created successfully',
    };
  }

  @Get()
  async findAll() {
    const tasks = await this.tasksService.findAll();
    return {
      success: true,
      data: tasks,
      message: 'Tasks retrieved successfully',
    };
  }

  @Get('project/:projectId')
  async findByProject(@Param('projectId', new ParseUUIDPipe()) projectId: string) {
    const tasks = await this.tasksService.findByProject(projectId);
    return {
      success: true,
      data: tasks,
      message: 'Tasks retrieved successfully',
    };
  }

  @Get('user/:userId')
  async findByUser(@Param('userId', new ParseUUIDPipe()) userId: string) {
    const tasks = await this.tasksService.findByUser(userId);
    return {
      success: true,
      data: tasks,
      message: 'Tasks retrieved successfully',
    };
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const task = await this.tasksService.findOne(id);
    return {
      success: true,
      data: task,
      message: 'Task retrieved successfully',
    };
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const task = await this.tasksService.update(id, updateTaskDto);
    return {
      success: true,
      data: task,
      message: 'Task updated successfully',
    };
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body('status') status: string,
  ) {
    const task = await this.tasksService.updateStatus(id, status);
    return {
      success: true,
      data: task,
      message: 'Task status updated successfully',
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.tasksService.remove(id);
    return {
      success: true,
      message: 'Task deleted successfully',
    };
  }
}