import { MongoMemoryServer } from 'mongodb-memory-server';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import { ApolloServerTestClient, createTestClient } from 'apollo-server-testing';
import { GraphQLResponse } from 'apollo-server-types';
import ApolloConfig from '../graphql';
import {
  CREATE_TODOS, DELETE_TODOS, GET_TODOS, UPDATE_TODOS,
} from './query';
import { ModifyUser } from '../graphql/resolvers/auth';
import { createUser } from './user.test';
import { UserData } from '../graphql/context';
import CreateTestApolloConfig from './testConfig';
import { Todo } from '../models/todoModel';
import { ModifyTodoInput } from '../graphql/resolvers/todo';

interface Todo {
  id: string;
  description: string;
}

interface GetTodoRes {
  todos: Todo[];
}

interface CreateTodoRes {
  createTodo: Todo;
}

interface UpdateTodoRes {
  updateTodo: Todo;
}

interface DeleteTodoRes {
  deleteTodo: string;
}

// function to create an item
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const CreateTodo = async (qlClient: ApolloServerTestClient, description: string) => {
  // compose the variable
  const input = {
    description,
  };

  // create a new item
  const res: GraphQLResponse = await qlClient.mutate({
    mutation: CREATE_TODOS,
    variables: {
      createInput: input,
    },
  });

  const result = res.data as CreateTodoRes;

  return result.createTodo;
};

// function to query items
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const GetTodos = async (qlClient: ApolloServerTestClient) => {
  const res: GraphQLResponse = await qlClient.query({
    query: GET_TODOS,
  });
  const result = res.data as GetTodoRes;

  return result.todos;
};

// function to update item
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const UpdateTodo = async (qlClient: ApolloServerTestClient, input: ModifyTodoInput) => {
  // update an item
  const res: GraphQLResponse = await qlClient.mutate({
    mutation: UPDATE_TODOS,
    variables: {
      updateInput: input,
    },
  });

  const result = res.data as UpdateTodoRes;

  return result.updateTodo;
};

// function to delete item
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const DeleteTodo = async (qlClient: ApolloServerTestClient, id: string) => {
  const input = {
    todoId: id,
  };

  // delete an item
  const res: GraphQLResponse = await qlClient.mutate({
    mutation: DELETE_TODOS,
    variables: {
      deleteInput: input,
    },
  });

  const result = res.data as DeleteTodoRes;

  return result.deleteTodo;
};

describe('integration test for all todo entity related', () => {
  let mongod: MongoMemoryServer;
  let qlClient: ApolloServerTestClient;
  let qlServer: ApolloServer;
  let userData: UserData;

  beforeEach(async () => {
    // init the mongo in mem server
    mongod = new MongoMemoryServer();
    const uri = await mongod.getUri();

    // connect mongoose to the server
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    // this is a workaround for https://github.com/apollographql/apollo-server/issues/2277
    // create an extra apollo server to create an user
    // in order to have a user data in the mongo which the to can reference
    // also allow us use the authenticated resolvers
    // create apollo server
    const tempQLServer = new ApolloServer(ApolloConfig);

    // create the client
    const tempQLClient = createTestClient(tempQLServer);

    // create an user for each test so is it authorized
    const createUserInput: ModifyUser = {
      username: 'username',
      password: 'password',
    };
    const createRes = await createUser(tempQLClient, createUserInput);

    // stop the previous apollo server
    await tempQLServer.stop();

    // compose the userData for context
    userData = {
      userId: createRes.userId,
      username: createUserInput.username,
    };

    // create the new apollo config
    const testConfig = CreateTestApolloConfig(userData);

    // create the actual test apollo server
    qlServer = new ApolloServer(testConfig);

    // create the actual apollo test client
    qlClient = createTestClient(qlServer);
  });

  afterEach(async () => {
    // stop the apollo server
    await qlServer.stop();

    // close the mongoose connection
    await mongoose.disconnect();

    // close the in mem db
    await mongod.stop();
  });

  it('should create a todo', async () => {
    const description = 'this is a mock';

    // create item
    const createRes = await CreateTodo(qlClient, description);

    // description should match
    expect(createRes).toBeDefined();
    expect(createRes.description).toBe(description);
  });

  it('should query a todo', async () => {
    const description = 'this is a mock';

    // create item
    const createRes = await CreateTodo(qlClient, description);

    // description should match
    expect(createRes).toBeDefined();
    expect(createRes.description).toBe(description);

    // query item
    const todos = await GetTodos(qlClient);

    // check the query return
    expect(todos.length).toBe(1);
    expect(todos[0].description).toBe(description);
  });

  it('should update the todo', async () => {
    const description = 'this is a mock';

    // create item
    const createRes = await CreateTodo(qlClient, description);

    // description should match
    expect(createRes).toBeDefined();
    expect(createRes.description).toBe(description);

    const newDescription = 'this is an updated mock';

    // update the item
    const updateInput: ModifyTodoInput = {
      todoId: createRes.id,
      description: newDescription,
    };
    const updateRes = await UpdateTodo(qlClient, updateInput);

    // check the updated item
    expect(updateRes).toBeDefined();
    expect(updateRes.description).toBe(newDescription);
  });

  it('should delete a todo', async () => {
    // create item 1
    const des1 = 'this is a mock 1';
    const createRes1 = await CreateTodo(qlClient, des1);

    // description should match
    expect(createRes1).toBeDefined();
    expect(createRes1.description).toBe(des1);

    // create item 2
    const des2 = 'this is a mock 2';
    const createRes2 = await CreateTodo(qlClient, des2);

    // description should match
    expect(createRes2).toBeDefined();
    expect(createRes2.description).toBe(des2);

    // delete item 1
    const deletedId = await DeleteTodo(qlClient, createRes1.id);

    // deleted id should match
    expect(deletedId).toBe(createRes1.id);

    // query all todos
    const todos = await GetTodos(qlClient);

    // it should only have item 2 left
    expect(todos.length).toBe(1);
    expect(todos[0].id).toBe(createRes2.id);
    expect(todos[0].description).toBe(createRes2.description);
  });
});
