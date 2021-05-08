import express, { Express } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import config from "../config.json";
import { rootQueryType, schema } from "./app/schema";
import jwt from "jsonwebtoken";

var { graphqlHTTP } = require("express-graphql");
const expressPlayground = require("graphql-playground-middleware-express")
  .default;
const app: Express = express();

app.set("json spaces", 4);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authMiddleware = (req: any, res: any, next: any) => {
  const validateToken: any = (token: any) => {
    if (token) {
      try {
        return jwt.verify(token, "supersecretkey");
      } catch (err) {
        throw new Error("Session invalid");
      }
    }
  };
  const token = req.headers.authorization;

  validateToken(token);
  next();
};
app.use(authMiddleware);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: rootQueryType,
    graphiql: true,
  })
);
app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

// Handle logs in console during development
if (
  process.env.NODE_ENV === "development" ||
  config.NODE_ENV === "development"
) {
  app.use(morgan("dev"));
  app.use(cors());
}

// Handle security and origin in production
if (process.env.NODE_ENV === "production" || config.NODE_ENV === "production") {
  app.use(helmet());
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    return res.status(500).json({
      errorName: err.name,
      message: err.message,
      stack: err.stack || "no stack defined",
    });
  }
);

export default app;
