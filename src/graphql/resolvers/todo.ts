import { Todo } from '../../models/todoModel';
import { UserData } from '../context';

// resolver to handle todos related

interface ModifyTodoInput{
  todoId: string;
  description: string;
}

interface TodoArgs {
  createTodoInput: ModifyTodoInput;
  updateTodoInput: ModifyTodoInput;
  deleteTodoInput: ModifyTodoInput;
}

function checkUserData(data: UserData) {
  if (!data.isAuth) {
    throw new Error('The user is not logged in');
  }
}

// query all the todos based on the userID
export const todos = async (parent: any, args: TodoArgs, context: UserData) => {
  checkUserData(context);

  try {
    // make sure only get the todos that belongs to this user
    return Todo.find({ user: context.userId });
  } catch (e) {
    throw new Error(e);
  }
};

// create a item for the specified user
export const createTodo = async (parent: any, args: TodoArgs, context: UserData) => {
  checkUserData(context);

  const todo = new Todo({
    user: context.userId,
    description: args.createTodoInput.description,
  });
  try {
    return await todo.save();
  } catch (e) {
    throw new Error(e);
  }
};

// update an item
export const updateTodo = async (parent: any, args: TodoArgs, context: UserData) => {
  checkUserData(context);

  try {
    // firstly find the todos
    const todo = await Todo.findOne({ _id: args.updateTodoInput.todoId, user: context.userId });

    // if does not exist
    if (!todo) {
      throw new Error('This todo item does not exist');
    }

    // change the description and save in the db
    todo.description = args.updateTodoInput.description;

    // return the saved item
    return await todo.save();
  } catch (e) {
    throw new Error(e);
  }
};

// delete an item
export const deleteTodo = async (parent: any, args: TodoArgs, context: UserData) => {
  checkUserData(context);

  try {
    // firstly find the todos
    const todo = await Todo.findOne({ _id: args.deleteTodoInput.todoId, user: context.userId });

    // if does not exist
    if (!todo) {
      throw new Error('This todo item does not exist');
      return;
    }

    // delete in the db
    await todo.remove();

    // return the id
    return todo._id;
  } catch (e) {
    throw new Error(e);
  }
};
