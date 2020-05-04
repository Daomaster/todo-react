import mongoose, { Schema, Document} from 'mongoose';
import {IUser} from './user';

export interface ITodo extends Document{
    description: string;
    user: IUser['_id'];
}

const TodoSchema: Schema= new Schema({
    description: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, required: true},
}, {timestamps: true})

export default mongoose.model<ITodo>('Todo', TodoSchema);
