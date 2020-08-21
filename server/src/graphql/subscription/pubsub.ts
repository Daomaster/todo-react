import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

export const TodoUpdated = "TodoUpdated";
export const UserUpdated = "UserUpdated";