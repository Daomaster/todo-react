import { combineResolvers } from "graphql-resolvers";
import {
  GraphQLContext,
  isAuthenticated,
  GraphQLSubscriptionContext,
} from "../context";
import { pubsub, TodoUpdated } from "../subscription/pubsub";
import { withFilter } from "apollo-server";
import { TodoModel } from "../../models/todoModel";

// resolver to handle todos related
export interface ModifyTodoInput {
  todoId: string;
  description: string;
}

interface TodoArgs {
  createTodoInput: ModifyTodoInput;
  updateTodoInput: ModifyTodoInput;
  deleteTodoInput: ModifyTodoInput;
}

// query all the todos based on the userID
export const todos = combineResolvers(
  isAuthenticated,
  async (_parent: any, _args: TodoArgs, context: GraphQLContext) => {
    try {
      // make sure only get the todos that belongs to this user
      return context.Models.Todo.find({ user: context.Auth.userId });
    } catch (e) {
      throw new Error(e);
    }
  }
);

// create a item for the specified user
export const createTodo = combineResolvers(
  isAuthenticated,
  async (__, args: TodoArgs, context: GraphQLContext) => {
    const todo = new context.Models.Todo({
      user: context.Auth.userId,
      description: args.createTodoInput.description,
    });
    try {
      return await todo.save();
    } catch (e) {
      throw new Error(e);
    }
  }
);

// update an item
export const updateTodo = combineResolvers(
  isAuthenticated,
  async (__, args: TodoArgs, context: GraphQLContext) => {
    try {
      // firstly find the todos
      const todo = await context.Models.Todo.findOne({
        _id: args.updateTodoInput.todoId,
        user: context.Auth.userId,
      });

      // if does not exist
      if (!todo) {
        throw new Error("This todo item does not exist");
      }

      // change the description and save in the db
      todo.description = args.updateTodoInput.description;

      // return the saved item
      await todo.save();

      // publish the updated todo to the event
      context.Pubsub.publish(TodoUpdated, todo);

      return todo;
    } catch (e) {
      throw new Error(e);
    }
  }
);

// delete an item
export const deleteTodo = combineResolvers(
  isAuthenticated,
  async (__, args: TodoArgs, context: GraphQLContext) => {
    try {
      // firstly find the todos
      const todo = await context.Models.Todo.findOne({
        _id: args.deleteTodoInput.todoId,
        user: context.Auth.userId,
      });

      // if does not exist
      if (!todo) {
        throw new Error("This todo item does not exist");
      }

      // delete in the db
      await todo.remove();

      // return the id
      return todo._id;
    } catch (e) {
      throw new Error(e);
    }
  }
);

//resolver for the subscription when todo updated
export const todoUpdated = {
  resolve: (payload: TodoModel, _args: any, _context: any, _info: any) => {
    // resolve for manipulate the payload
    payload.id = payload._id;
    return payload;
  },
  subscribe: withFilter(
    // when the subscription is connected
    () => {
      return pubsub.asyncIterator(TodoUpdated);
    },
    // every time the event fire
    (_payload, _variables, _context: GraphQLSubscriptionContext): boolean => {
      return true;
    }
  ),
};
