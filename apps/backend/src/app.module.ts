import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    ProjectsModule,
    TasksModule,
  ],
})
export class AppModule {}