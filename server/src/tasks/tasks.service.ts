import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  async getTasks(userId: number): Promise<Task[]> {
    return await this.tasksRepository.find({
      where: { user: { id: userId } }, // filtrer par la relation User
      relations: ['user', 'subtasks'], // charger les relations si besoin
    });
  }

  async getTask(userId: number, taskId: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id: taskId, user: { id: userId } },
      relations: ['user', 'subtasks'],
    });
    if (!task) {
      throw new NotFoundException('Task not found for this user');
    }
    return task;
  }

  async saveTask(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      user: { id: userId }, // associer l'utilisateur via la relation
    });
    return this.tasksRepository.save(task);
  }

  async patchTask(
    taskId: number,
    partialTaskDto: Partial<CreateTaskDto>,
    userId: number,
  ): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id: taskId, user: { id: userId } },
    });
    if (!task) {
      throw new NotFoundException('Task not found for this user');
    }
    Object.assign(task, partialTaskDto);
    return this.tasksRepository.save(task);
  }

  async deleteTask(taskId: number, userId: number): Promise<void> {
    const result = await this.tasksRepository.delete({
      id: taskId,
      user: { id: userId },
    });
    if (result.affected === 0) {
      throw new NotFoundException('Task not found for this user');
    }
  }
}
