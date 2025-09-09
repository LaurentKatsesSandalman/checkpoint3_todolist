import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity()
export class Subtask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column()
  isDone: boolean;

  @Column()
  position: number;

  @ManyToOne(() => Task, (task) => task.subtasks, { onDelete: 'CASCADE' })
  task: Task;
}
