import { RedisPubSub } from 'graphql-redis-subscriptions';
const Redis = require('ioredis')

export const TodoUpdated = "TodoUpdated";

const options = {
    host: process.env.REDIS_DOMAIN_NAME || "localhost",
    port: process.env.REDIS_PORT_NUMBER || "6379",
    retryStrategy: (times: number) => {
      // reconnect after
      return Math.min(times * 50, 2000);
    }
  };
  
export const pubsub = new RedisPubSub({
    publisher: new Redis({options}),
    subscriber: new Redis(options)
  });