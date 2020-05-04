import {ApolloServerExpressConfig} from "apollo-server-express";
import resolvers from "./resolvers";
import typeDefs from "./schemas";
import jwt from 'jsonwebtoken';

export interface IAuthData {
    isAuth: boolean;
    username: string;
    userId: string;
}

const apolloConfig: ApolloServerExpressConfig = {
    typeDefs,
    resolvers,
    introspection: true,
    context: ({ req }): IAuthData => {
        // init the auth data
        let authData: IAuthData = {
            isAuth: false,
            username: '',
            userId: ''
        };

        // get the auth header
        const authHeader = req.get('Authorization');

        // if the header is present then return false
        if (!authHeader) {
            return authData;
        }

        // split the bearer
        const token = authHeader.split(' ')[1];

        // try to decode the token into auth data
        try {
            authData = jwt.verify(token, 'my jwt secret') as IAuthData;
        } catch (err) {
            // if there is an error then not auth
            return authData;
        }

        // turn the flag to true
        authData.isAuth = true
        return authData
    },
    playground: process.env.NODE_ENV !== 'production'
};

export default apolloConfig;
