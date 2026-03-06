import { Module } from '@nestjs/common';
import { TasksService } from '../tasks/tasks.service';
import { TasksController } from '../tasks/tasks.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}