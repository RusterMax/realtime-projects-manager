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
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProjectDto: CreateProjectDto) {
    try {
      const project = await this.projectsService.create(createProjectDto);
      return {
        success: true,
        data: project,
        message: 'Project created successfully',
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
      const projects = await this.projectsService.findAll();
      return {
        success: true,
        data: projects,
        message: 'Projects retrieved successfully',
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
      const project = await this.projectsService.findOne(id);
      return {
        success: true,
        data: project,
        message: 'Project retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get(':id/tasks')
  async getProjectTasks(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const project = await this.projectsService.findOne(id);
      return {
        success: true,
        data: project.tasks || [],
        message: 'Project tasks retrieved successfully',
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
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    try {
      const project = await this.projectsService.update(id, updateProjectDto);
      return {
        success: true,
        data: project,
        message: 'Project updated successfully',
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
      await this.projectsService.remove(id);
      return {
        success: true,
        message: 'Project deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}