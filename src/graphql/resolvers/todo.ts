import Todo from '../../models/todo';
import {IAuthData} from "../index";

// query all the todos based on the userID
export const todos = async (parent: any, args: any, context: IAuthData) => {
   try {
       return Todo.find({user: context.userId});
   } catch (e) {
       throw new Error(e);
   }
};

// create a item for the specified user
export const createTodo = async (parent: any, args: any, context: IAuthData) => {
    const todo = new Todo({
        user: context.userId,
        description: args.createTodoInput.description
    });
    try {
       return await todo.save();
    } catch (e) {
        throw new Error(e);
    }
};
