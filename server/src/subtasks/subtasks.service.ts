import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Subtask } from './subtask.entity';
import { Task } from '../tasks/task.entity';

@Injectable()
export class SubtasksService {
  constructor(
    @InjectRepository(Subtask) private subtasksRepository: Repository<Subtask>,
  ) {}

  async syncSubtasks(
    subtasks: Partial<Subtask>[],
    task: Task,
  ): Promise<Subtask[]> {
    // get existing subtasks from bdd
    const existingSubtasks = await this.subtasksRepository.find({
      where: { task: { id: task.id } },
    });

    const result: Subtask[] = [];

    const clientSubtasksIds = subtasks
      .map((subtask) => subtask.id)
      .filter((id) => id !== undefined);

    // Delete subtasks non existing for client
    const toDelete = existingSubtasks.filter(
      (subtask) => !clientSubtasksIds.includes(subtask.id),
    );
    if (toDelete.length > 0) {
      const idsToDelete = toDelete.map((subtask) => subtask.id);
      await this.subtasksRepository.delete({ id: In(idsToDelete) });
    }

    // Create or update each subtask
    for (const subtask of subtasks || []) {
      if (subtask.id) {
        // update
        const existing = existingSubtasks.find((e) => e.id === subtask.id);
        if (existing) {
          existing.title = subtask.title ?? existing.title;
          existing.isDone = subtask.isDone ?? existing.isDone;
          existing.position = subtask.position ?? existing.position;
          result.push(await this.subtasksRepository.save(existing));
        }
      } else {
        //create
        const newSubtask = this.subtasksRepository.create({
          title: subtask.title,
          isDone: subtask.isDone ?? false,
          position: subtask.position,
          task,
        });
        result.push(await this.subtasksRepository.save(newSubtask));
      }
    }

    return result;
  }
}
