import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Subtask } from '../subtasks/subtask.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 250 })
  description: string;

  @OneToMany(() => Subtask, (subtask) => subtask.task)
  subtasks: Subtask[];

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  user: User;
}
