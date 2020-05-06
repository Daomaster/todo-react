import jwt from 'jsonwebtoken';

export interface UserData {
  isAuth: boolean;
  username: string;
  userId: string;
}

export const contextHandler = ({ req }: any): UserData => {
  // init the auth data
  let authData: UserData = {
    isAuth: false,
    username: '',
    userId: '',
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
    authData = jwt.verify(token, 'my jwt secret') as UserData;
  } catch (err) {
    // if there is an error then not auth
    return authData;
  }

  // turn the flag to true
  authData.isAuth = true;
  return authData;
};
