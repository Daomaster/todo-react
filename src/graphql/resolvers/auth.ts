import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../../models/user';

// resolver to handle user auth related

// temp placeholder for the jwt secret
const secret = "my jwt secret";

// login the user and return the auth data
export const login = async (parent: any, args: any) => {
    try {
        const user = await User.findOne({ username: args.username });
        // check if the user exist first
        if (!user) {
            throw new Error('User does not exist!');
        }

        // check the hashed password
        const isEqual = await bcrypt.compare(args.password, user.password);
        if (!isEqual) {
            throw new Error('Password is incorrect!');
        }

        // return the jwt
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            secret,
            {
                expiresIn: '1h'
            }
        );
        return { userId: user.id, token: token};

    } catch (e) {
        throw new Error(e);
    }
}

// create a user in the db and login the user
export const createUser = async (parent: any, args: any) => {
    try {
        const uniqueUser = await User.findOne({ username: args.createUserInput.username });
        if (uniqueUser) {
            // user already exist
            throw new Error('User exists already.');
        }
        // save the hashed password not in plain text :)
        const hashedPassword = await bcrypt.hash(args.createUserInput.password, 12);

        const user = new User({
            username: args.createUserInput.username,
            password: hashedPassword
        });

        // save the user in the db
        await user.save();

        // return the auth data
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            secret,
            {
                expiresIn: '1h'
            }
        );

        console.log(token);

        return { userId: user.id, token: token};
    } catch (e) {
        throw new Error(e);
    }
}
