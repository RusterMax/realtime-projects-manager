import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({
      data: createProjectDto,
      include: {
        user: true,
        tasks: true,
      },
    });
  }

  async findAll() {
    return this.prisma.project.findMany({
      include: {
        user: true,
        tasks: true,
      },
    });
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        user: true,
        tasks: true,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    try {
      return await this.prisma.project.update({
        where: { id },
        data: updateProjectDto,
        include: {
          user: true,
          tasks: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.project.delete({
        where: { id },
      });
      return { deleted: true };
    } catch (error) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
  }
}