import { UserData } from "./context";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server";

const secret = `${process.env.JWT_SECRET}`;

export const getAuth = (req: any) => {
  if (!req) return;
  let rawToken = req.headers.authorization;

  if (rawToken) {
    return validateToken(rawToken);
  }
};

export const validateToken = (token: string): UserData => {
  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length).trimLeft();

    try {
      return jwt.verify(token, secret) as UserData;
    } catch (e) {
      throw new AuthenticationError("Your session expired. Sign in again.");
    }
  }

  throw new AuthenticationError("Your session expired. Sign in again.");
};
