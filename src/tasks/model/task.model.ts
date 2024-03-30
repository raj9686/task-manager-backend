import { Document } from 'mongoose';

export interface Task extends Document {
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
