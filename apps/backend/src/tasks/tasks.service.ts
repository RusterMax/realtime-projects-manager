import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: createTaskDto,
      include: {
        project: true,
        user: true,
      },
    });
  }

  async findAll() {
    return this.prisma.task.findMany({
      include: {
        project: true,
        user: true,
      },
    });
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        project: {
          include: {
            user: true,
          },
        },
        user: true,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      return await this.prisma.task.update({
        where: { id },
        data: updateTaskDto,
        include: {
          project: true,
          user: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.task.delete({
        where: { id },
      });
      return { deleted: true };
    } catch (error) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async findByProject(projectId: string) {
    return this.prisma.task.findMany({
      where: { projectId },
      include: {
        user: true,
      },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.task.findMany({
      where: { assignedTo: userId },
      include: {
        project: true,
      },
    });
  }
}