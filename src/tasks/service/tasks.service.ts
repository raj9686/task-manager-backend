import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from '../model/task.schema';
import { Model } from 'mongoose';
@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async getAllTasks(status: string): Promise<Task[]> {
    const q = status === 'All' ? {} : { status };
    return this.taskModel.aggregate([
      {
        $match: q,
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
  }

  async createTask(task: Task): Promise<Task> {
    return this.taskModel.create(task);
  }

  async updateTask(id: string, updatedTask: Task): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, updatedTask, { new: true });
  }

  async deleteTask(id: string): Promise<void> {
    await this.taskModel.findByIdAndDelete(id);
  }

  async getTaskById(id: string): Promise<Task> {
    return this.taskModel.findById(id);
  }
}
