import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from 'src/tasks/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @OneToMany(() => Task, task => task.user)
  tasks: Task[];
}
