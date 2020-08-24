import {
  createTodo, deleteTodo, todos, updateTodo, todoUpdated
} from './todo';
import { createUser, login } from './user';

const resolvers = {
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
  Subscription: {
    todoUpdated,
  }
};

export default resolvers;
