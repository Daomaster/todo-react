import Todo from '../../models/todo';
import {IUserData} from "../context";

// resolver to handle todos related

interface IModifyTodoInput{
    todoId: string;
    description: string;
}

interface ITodoArgs {
    createTodoInput: IModifyTodoInput;
    updateTodoInput: IModifyTodoInput;
    deleteTodoInput: IModifyTodoInput;
}

function checkUserData(data: IUserData) {
    if (!data.isAuth) {
        throw new Error("The user is not logged in");
    }

    return;
}

// query all the todos based on the userID
export const todos = async (parent: any, args: ITodoArgs, context: IUserData) => {
    checkUserData(context);

    try {
       // make sure only get the todos that belongs to this user
       return Todo.find({user: context.userId});
   } catch (e) {
       throw new Error(e);
   }
};

// create a item for the specified user
export const createTodo = async (parent: any, args: ITodoArgs, context: IUserData) => {
    checkUserData(context);

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

// update an item
export const updateTodo = async (parent: any, args: ITodoArgs, context: IUserData) => {
    checkUserData(context);

    try {
        // firstly find the todos
        const todo = await Todo.findOne({_id: args.updateTodoInput.todoId, user: context.userId})

        // if does not exist
        if (!todo) {
            throw new Error("This todo item does not exist");
        }

        // change the description and save in the db
        todo.description = args.updateTodoInput.description;

        // return the saved item
        return await todo.save();
    } catch (e) {
        throw new Error(e);
    }
}

// delete an item
export const deleteTodo = async (parent: any, args: ITodoArgs, context: IUserData) => {
    checkUserData(context);

    try {
        // firstly find the todos
        const todo = await Todo.findOne({_id: args.deleteTodoInput.todoId, user: context.userId})

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
