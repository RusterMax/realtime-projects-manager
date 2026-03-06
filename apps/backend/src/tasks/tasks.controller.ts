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
  Query,
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
    try {
      const task = await this.tasksService.create(createTaskDto);
      return {
        success: true,
        data: task,
        message: 'Task created successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get()
  async findAll() {
    try {
      const tasks = await this.tasksService.findAll();
      return {
        success: true,
        data: tasks,
        message: 'Tasks retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get('project/:projectId')
  async findByProject(@Param('projectId', new ParseUUIDPipe()) projectId: string) {
    try {
      const tasks = await this.tasksService.findByProject(projectId);
      return {
        success: true,
        data: tasks,
        message: 'Tasks retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get('user/:userId')
  async findByUser(@Param('userId', new ParseUUIDPipe()) userId: string) {
    try {
      const tasks = await this.tasksService.findByUser(userId);
      return {
        success: true,
        data: tasks,
        message: 'Tasks retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const task = await this.tasksService.findOne(id);
      return {
        success: true,
        data: task,
        message: 'Task retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    try {
      const task = await this.tasksService.update(id, updateTaskDto);
      return {
        success: true,
        data: task,
        message: 'Task updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      await this.tasksService.remove(id);
      return {
        success: true,
        message: 'Task deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}