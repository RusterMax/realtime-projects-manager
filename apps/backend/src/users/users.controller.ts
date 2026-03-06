// backend/src/users/users.controller.ts
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
  Query
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return {
        success: true,
        data: user,
        message: 'User created successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  @Get()
  async findAll() {
    try {
      const users = await this.usersService.findAll();
      return {
        success: true,
        data: users,
        message: 'Users retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const user = await this.usersService.findOne(id);
      return {
        success: true,
        data: user,
        message: 'User retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  @Get(':id/projects')
  async getUserProjects(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const user = await this.usersService.findOneWithProjects(id);
      return {
        success: true,
        data: user.projects || [],
        message: 'User projects retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  @Get(':id/tasks')
  async getUserTasks(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const user = await this.usersService.findOne(id);
      // Собираем все задачи из всех проектов
      const tasks = user.projects?.flatMap(project => project.tasks) || [];
      return {
        success: true,
        data: tasks,
        message: 'User tasks retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string, 
    @Body() updateUserDto: UpdateUserDto
  ) {
    try {
      const user = await this.usersService.update(id, updateUserDto);
      return {
        success: true,
        data: user,
        message: 'User updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      await this.usersService.remove(id);
      return {
        success: true,
        message: 'User deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }
}