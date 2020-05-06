import {
  createTodo, deleteTodo, todos, updateTodo,
} from './todo';
import { createUser, login } from './auth';

const resolvers: any = {
  Query: {
    todos,
  },
  Mutation: {
    createUser,
    createTodo,
    updateTodo,
    deleteTodo,
    login,
  },
};

export default resolvers;
