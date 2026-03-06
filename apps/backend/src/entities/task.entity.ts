import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Project } from './project.entity';
import { User } from './user.entity';

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO
  })
  status: TaskStatus;

  @Column()
  projectId: string;

  @ManyToOne(() => Project, project => project.tasks)
  project: Project;

  @Column({ nullable: true })
  userId: string;

  @ManyToOne(() => User, user => user.tasks, { nullable: true })
  user: User;
}