import {todos, createTodo, updateTodo, deleteTodo} from './todo'
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
        updateTodo,
        deleteTodo,
    }
};

export default resolvers;
