import jwt from 'jsonwebtoken';
import { ForbiddenError } from 'apollo-server';
import { AuthenticationError } from 'apollo-server-express';
import { skip } from 'graphql-resolvers';
import Models, { MongoModels } from '../models';

export interface UserData {
  username: string;
  userId: string;
}

export interface GraphQLContext {
  Models: MongoModels;
  Auth: UserData;
}

const getAuth = (req: any) => {
  let token = req.headers.authorization;

  if (token) {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length).trimLeft();
    } else {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }

    try {
      return jwt.verify(token, '111') as UserData;
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
};

export const isAuthenticated = (parent: any, args: any, context: GraphQLContext) => (context.Auth ? skip : new ForbiddenError('Not logged in'));

export const contextHandler = ({ req }: any): (GraphQLContext | null) => {
  const auth = getAuth(req);

  // there is no auth header present
  if (!auth) {
    // create a empty auth for user endpoints
    const emptyAuth: UserData = {
      userId: '',
      username: '',
    };

    return {
      Models,
      Auth: emptyAuth,
    };
  }

  // return the auth and models
  return {
    Models,
    Auth: auth,
  };
};
