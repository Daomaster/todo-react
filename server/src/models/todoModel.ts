import mongoose, { Schema, Document } from 'mongoose';
import { UserModel } from './userModel';

export interface TodoModel extends Document{
  description: string;
  user: UserModel['_id'];
}

const TodoSchema: Schema = new Schema({
  description: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, required: true },
}, { timestamps: true });

export const Todo = mongoose.model<TodoModel>('Todo', TodoSchema);
