import { ForbiddenError } from "apollo-server";
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { skip } from "graphql-resolvers";
import Models, { MongoModels } from "../models";
import { pubsub } from "./subscription/pubsub";
import { getAuth } from "./auth";
import WebSocket from "ws";

export interface UserData {
  username: string;
  userId: string;
}

export interface GraphQLContext {
  Models: MongoModels;
  Auth: UserData;
  Pubsub: RedisPubSub;
}

export interface GraphQLSubscriptionContext {
  Auth: UserData;
  Socket: WebSocket;
}

export const isAuthenticated = (
  parent: any,
  args: any,
  context: GraphQLContext
) => (context.Auth ? skip : new ForbiddenError("Not logged in"));

export const contextHandler = ({
  req,
  connection,
}: any): GraphQLContext | GraphQLSubscriptionContext | null => {
  // check if subscriotion context
  if (connection) {
    return connection.context;
  }

  // regular requests
  const auth = getAuth(req);

  // there is no auth header present
  if (!auth) {
    // create a empty auth for user endpoints
    return {
      Models,
      Auth: {
        userId: "",
        username: "",
      },
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
