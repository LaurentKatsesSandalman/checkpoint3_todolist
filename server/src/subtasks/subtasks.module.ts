import { Module } from '@nestjs/common';
import { Subtask } from './subtask.entity';

import { SubtasksService } from './subtasks.service';


import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Subtask])],
  providers: [SubtasksService],
})

export class SubtasksModule {}
