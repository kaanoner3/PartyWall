import jwt from "jsonwebtoken";
import { config } from "../config";

export const authMiddleware = (req: any, res: any, next: any) => {
  const getUserFromToken: any = (token: any) => {
    if (token) {
      try {
        return jwt.verify(token, config.jwtSecretKey);
      } catch (err) {
        return false;
      }
    }
  };
  const token = req.headers.authorization;
  const user = getUserFromToken(token);

  if (user) {
    Object.assign(req, { isAuthenticated: true, userId: user.id });
  } else {
    Object.assign(req, { isAuthenticated: false, userId: -1 });
  }
  next();
};
