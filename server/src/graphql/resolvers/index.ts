import {
  createTodo, deleteTodo, todos, updateTodo, todoUpdated
} from './todo';
import { createUser, login, userUpdated } from './user';

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
    userUpdated
  }
};

export default resolvers;
