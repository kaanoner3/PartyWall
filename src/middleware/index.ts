import jwt from "jsonwebtoken";
import { config } from "../config";

export const authMiddleware = (req: any, res: any, next: any) => {
  const validateToken: any = (token: any) => {
    if (token) {
      try {
        return jwt.verify(token, config.jwtSecretKey);
      } catch (err) {
        return false
      }
    }
  };
  const token = req.headers.authorization;
  validateToken(token);
  if (token) {
    Object.assign(req, {isAuthenticated:true})
  }else {
    Object.assign(req, {isAuthenticated:false})
  }
  next();
};
