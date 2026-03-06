import { User, Project, Task } from '@prisma/client';

// Тип пользователя с проектами
export type UserWithProjects = User & {
  projects: (Project & {
    tasks?: Task[];
  })[];
};

// Тип пользователя с проектами и задачами
export type UserWithFullDetails = User & {
  projects: (Project & {
    tasks: Task[];
  })[];
};

// Тип для ответа API
export type UserResponse = {
  id: string;
  email: string;
  name: string | null;
  projects?: ProjectWithTasks[];
  createdAt: Date;
  updatedAt: Date;
};

export type ProjectWithTasks = Project & {
  tasks: Task[];
};