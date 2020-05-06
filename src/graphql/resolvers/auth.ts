import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../../models/userModel';

// resolver to handle user auth related

interface AuthData {
  userId: string;
  token: string;
}

interface ModifyUser {
  username: string;
  password: string;
}

interface UserArgs {
  createUserInput: ModifyUser;
}

// temp placeholder for the jwt secret
const secret = 'my jwt secret';

// login the user and return the auth data
export const login = async (parent: any, args: ModifyUser) => {
  try {
    const user = await User.findOne({ username: args.username });
    // check if the user exist first
    if (!user) {
      throw new Error('User does not exist!');
      return;
    }

    // check the hashed password
    const isEqual = await bcrypt.compare(args.password, user.password);
    if (!isEqual) {
      throw new Error('Password is incorrect!');
      return;
    }

    // sign the jwt
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      secret,
      {
        expiresIn: '1h',
      },
    );

    // return the auth data
    const authData: AuthData = {
      userId: user.id,
      token,
    };

    return authData;
  } catch (e) {
    throw new Error(e);
  }
};

// create a user in the db and login the user
export const createUser = async (parent: any, args: UserArgs) => {
  try {
    const uniqueUser = await User.findOne({ username: args.createUserInput.username });
    if (uniqueUser) {
      // user already exist
      throw new Error('User exists already.');
      return;
    }
    // save the hashed password not in plain text :)
    const hashedPassword = await bcrypt.hash(args.createUserInput.password, 12);

    const user = new User({
      username: args.createUserInput.username,
      password: hashedPassword,
    });

    // save the user in the db
    await user.save();

    // sign the auth data
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      secret,
      {
        expiresIn: '1h',
      },
    );

    // return the auth data
    const authData: AuthData = {
      userId: user.id,
      token,
    };

    return authData;
  } catch (e) {
    throw new Error(e);
  }
};
