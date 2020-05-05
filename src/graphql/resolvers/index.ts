import {todos, createTodo, updateTodo, deleteTodo} from './todo'
import {login, createUser} from "./auth";
import {IResolvers} from "graphql-tools";

const resolvers: IResolvers = {
    Query: {
        todos,
    },
    Mutation: {
        createUser,
        createTodo,
        updateTodo,
        deleteTodo,
        login,
    }
};

export default resolvers;
