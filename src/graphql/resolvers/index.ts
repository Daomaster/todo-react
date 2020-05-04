import {todos, createTodo} from './todo'
import {login, createUser} from "./auth";
import {IResolvers} from "graphql-tools";

const resolvers: IResolvers = {
    Query: {
        login,
        todos,
    },
    Mutation: {
        createUser,
        createTodo,
    }
};

export default resolvers;
