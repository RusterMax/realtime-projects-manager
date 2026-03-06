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
    const project = await this.projectsService.create(createProjectDto);
    return {
      success: true,
      data: project,
      message: 'Project created successfully',
    };
  }

  @Get()
  async findAll() {
    const projects = await this.projectsService.findAll();
    return {
      success: true,
      data: projects,
      message: 'Projects retrieved successfully',
    };
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const project = await this.projectsService.findOne(id);
    return {
      success: true,
      data: project,
      message: 'Project retrieved successfully',
    };
  }

  @Get(':id/tasks')
  async getProjectTasks(@Param('id', new ParseUUIDPipe()) id: string) {
    const project = await this.projectsService.findOne(id);
    return {
      success: true,
      data: project.tasks || [],
      message: 'Project tasks retrieved successfully',
    };
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    const project = await this.projectsService.update(id, updateProjectDto);
    return {
      success: true,
      data: project,
      message: 'Project updated successfully',
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.projectsService.remove(id);
    return {
      success: true,
      message: 'Project deleted successfully',
    };
  }
}