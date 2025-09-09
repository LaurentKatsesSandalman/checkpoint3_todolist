import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  UseGuards,
  Request,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './create-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { OwnerGuard } from '.././common/guards/owner.guard';

@Controller('users/:id/tasks')
@UseGuards(AuthGuard('jwt'), OwnerGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks(@Param('id') id: string) {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new BadRequestException('Invalid user id');
    }
    return this.tasksService.getTasks(userId);
  }

  @Get(':taskId')
  async getTaskById(
    @Param('id') id: string,
    @Param('taskId') taskIdParam: string,
  ) {
    const userId = parseInt(id, 10);
    const taskId = parseInt(taskIdParam, 10);
    if (isNaN(userId) || isNaN(taskId)) {
      throw new BadRequestException('Invalid ID');
    }
    return this.tasksService.getTask(userId, taskId);
  }

  @Post()
  async createTask(@Param('id') id: string, @Body() dto: CreateTaskDto) {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new BadRequestException('Invalid user id');
    }
    return this.tasksService.saveTask(dto, userId);
  }

  @Patch(':taskId')
  async updateTask(
    @Param('id') id: string,
    @Param('taskId') taskIdParam: string,
    @Body() partialTaskDto: Partial<CreateTaskDto>,
  ) {
    const userId = parseInt(id, 10);
    const taskId = parseInt(taskIdParam, 10);
    if (isNaN(userId) || isNaN(taskId)) {
      throw new BadRequestException('Invalid ID');
    }
    return this.tasksService.patchTask(taskId, partialTaskDto, userId);
  }

  @Delete(':taskId')
  async deleteTaskById(
    @Param('id') id: string,
    @Param('taskId') taskIdParam: string,
  ) {
    const userId = parseInt(id, 10);
    const taskId = parseInt(taskIdParam, 10);
    if (isNaN(userId) || isNaN(taskId)) {
      throw new BadRequestException('Invalid ID');
    }
    return this.tasksService.deleteTask(taskId, userId);
  }
}
