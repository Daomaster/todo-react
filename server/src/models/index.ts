import { Mongoose } from 'mongoose';
import { User } from './userModel';
import { Todo } from './todoModel';

export interface MongoModels {
  User: Mongoose['Model'];
  Todo: Mongoose['Model'];
}

export default {
  User,
  Todo,
};
