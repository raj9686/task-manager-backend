import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../model/task.model';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskModel.find().sort({ createdAt: -1 }).exec();
  }

  async createTask(task: Task): Promise<Task> {
    const newTask = new this.taskModel(task);
    return newTask.save();
  }

  async updateTask(id: string, updatedTask: Task): Promise<Task> {
    return this.taskModel
      .findByIdAndUpdate(id, updatedTask, { new: true })
      .exec();
  }

  async deleteTask(id: string): Promise<void> {
    await this.taskModel.findByIdAndDelete(id).exec();
  }

  async getTaskById(id: string): Promise<Task> {
    return this.taskModel.findById(id).exec();
  }
}
