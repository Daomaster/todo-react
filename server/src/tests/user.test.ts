import { MongoMemoryServer } from 'mongodb-memory-server';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import { ApolloServerTestClient, createTestClient } from 'apollo-server-testing';
import { GraphQLResponse } from 'apollo-server-types';
import ApolloConfig from '../graphql';
import { CREATE_USER, LOGIN } from './query';
import { AuthData, ModifyUser } from '../graphql/resolvers/auth';

interface CreateUserRes {
  createUser: AuthData;
}

interface LoginUserRes {
  login: AuthData;
}

// function to create a uer
// eslint-disable-next-line import/prefer-default-export
export const createUser = async (qlClient: ApolloServerTestClient, input: ModifyUser) => {
  // create user
  const res: GraphQLResponse = await qlClient.mutate({
    mutation: CREATE_USER,
    variables: {
      createInput: input,
    },
  });

  // cast to the auth data
  const result = res.data as CreateUserRes;

  return result.createUser;
};

describe('integration test for all user entity related', () => {
  let mongod: MongoMemoryServer;
  let qlClient: ApolloServerTestClient;
  let qlServer: ApolloServer;

  beforeAll(() => {
    // create apollo server
    qlServer = new ApolloServer(ApolloConfig);

    // create the client
    qlClient = createTestClient(qlServer);
  });

  afterAll(async () => {
    // stop the apollo server
    await qlServer.stop();
  });

  beforeEach(async () => {
    // init the mongo in mem server
    mongod = new MongoMemoryServer();
    const uri = await mongod.getUri();

    // connect mongoose to the server
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterEach(async () => {
    // close the mongoose connection
    await mongoose.disconnect();

    // close the in mem db
    await mongod.stop();
  });

  it('should create a user', async () => {
    // compose the variable
    const createUserInput: ModifyUser = {
      username: 'username',
      password: 'password',
    };

    // create user
    const createRes = await createUser(qlClient, createUserInput);

    // no way to really test the value since jwt and id are generated
    expect(createRes).toBeDefined();
  });

  it('should create a user and be able to login', async () => {
    // create user
    // compose the variable
    const createUserInput: ModifyUser = {
      username: 'username',
      password: 'password',
    };

    // create user
    const createRes = await createUser(qlClient, createUserInput);
    expect(createRes).toBeDefined();

    // login user
    const loginRes: GraphQLResponse = await qlClient.mutate({
      mutation: LOGIN,
      variables: createUserInput,
    });

    // cast to login res
    const loginResult = loginRes.data as LoginUserRes;

    // login has be defined
    expect(loginResult.login).toBeDefined();
    // userId should match the create user result
    expect(loginResult.login.userId).toBe(createRes.userId);
  });
});
