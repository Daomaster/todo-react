import { ForbiddenError } from 'apollo-server';
import { PubSub } from 'apollo-server-express';
import { skip } from 'graphql-resolvers';
import Models, { MongoModels } from '../models';
import { pubsub } from './subscription/pubsub';
import { getAuth } from './auth';

export interface UserData {
  username: string;
  userId: string;
}

export interface GraphQLContext {
  Models: MongoModels;
  Auth: UserData;
  Pubsub: PubSub;
}

export interface GraphQLSubscriptionContext {
  Auth: UserData;
  Pubsub: PubSub;
}

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
      Pubsub: pubsub,
    };
  }

  // return the auth and models
  return {
    Models,
    Auth: auth,
    Pubsub: pubsub,
  };
};
