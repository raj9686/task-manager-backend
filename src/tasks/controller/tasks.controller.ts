import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TasksService } from '../service/tasks.service';
import { Task } from '../model/task.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  @Post()
  async createTask(@Body() task: Task): Promise<Task> {
    return this.tasksService.createTask(task);
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() task: Task): Promise<Task> {
    return this.tasksService.updateTask(id, task);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }
}
