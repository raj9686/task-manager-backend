import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { Task, TaskDocument } from '../model/task.schema';
import { Model } from 'mongoose';

describe('TasksService', () => {
  let tasksService: TasksService;
  let taskModel: Model<TaskDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: {
            aggregate: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    taskModel = module.get<Model<TaskDocument>>(getModelToken(Task.name));
  });

  it('should be defined', () => {
    expect(tasksService).toBeDefined();
  });

  describe('getAllTasks', () => {
    it('should return all tasks if status is "All"', async () => {
      const mockTasks = [{ id: '1', title: 'Task 1', status: 'Done' }];
      jest.spyOn(taskModel, 'aggregate').mockResolvedValue(mockTasks);

      const result = await tasksService.getAllTasks('All');

      expect(result).toEqual(mockTasks);
      expect(taskModel.aggregate).toHaveBeenCalledWith([
        { $match: {} },
        { $sort: { createdAt: -1 } },
      ]);
    });

    it('should return tasks filtered by status', async () => {
      const mockTasks = [{ id: '2', title: 'Task 2', status: 'ToDo' }];
      jest.spyOn(taskModel, 'aggregate').mockResolvedValue(mockTasks);

      const result = await tasksService.getAllTasks('ToDo');

      expect(result).toEqual(mockTasks);
      expect(taskModel.aggregate).toHaveBeenCalledWith([
        { $match: { status: 'ToDo' } },
        { $sort: { createdAt: -1 } },
      ]);
    });
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      const newTask: any = { id: '3', title: 'Task 3', status: 'InProgress' };
      const mockSavedTask: TaskDocument = {
        ...newTask,
        _id: '3',
      } as TaskDocument;
      jest.spyOn(taskModel, 'create').mockResolvedValue(mockSavedTask as any);

      const result = await tasksService.createTask(newTask);

      expect(result).toEqual(mockSavedTask);
      expect(taskModel.create).toHaveBeenCalledWith(newTask);
    });
  });

  describe('updateTask', () => {
    it('should update an existing task', async () => {
      const taskId = '1';
      const updatedTask: any = {
        _id: taskId,
        title: 'Updated Task',
        status: 'Done',
      };
      jest
        .spyOn(taskModel, 'findByIdAndUpdate')
        .mockResolvedValue(updatedTask as TaskDocument);

      const result = await tasksService.updateTask(taskId, updatedTask);

      expect(result).toEqual(updatedTask);
      expect(taskModel.findByIdAndUpdate).toHaveBeenCalledWith(
        taskId,
        updatedTask,
        {
          new: true,
        },
      );
    });
  });

  describe('deleteTask', () => {
    it('should delete an existing task', async () => {
      const taskId = '1';
      jest.spyOn(taskModel, 'findByIdAndDelete').mockResolvedValue(null);

      await tasksService.deleteTask(taskId);

      expect(taskModel.findByIdAndDelete).toHaveBeenCalledWith(taskId);
    });
  });

  describe('getTaskById', () => {
    it('should return a task by id', async () => {
      const taskId = '1';
      const task: any = {
        _id: taskId,
        title: 'Task 1',
        status: 'ToDo',
      };
      jest.spyOn(taskModel, 'findById').mockResolvedValue(task as TaskDocument);

      const result = await tasksService.getTaskById(taskId);

      expect(result).toEqual(task);
      expect(taskModel.findById).toHaveBeenCalledWith(taskId);
    });
  });
});
