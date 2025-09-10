import { Module } from '@nestjs/common';
import { Task } from './task.entity';

import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TasksService],
  controllers: [TasksController],
})

export class TasksModule {}
