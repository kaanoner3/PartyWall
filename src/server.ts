import express, { Express } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import config from "../config.json";
import {rootQueryType, schema} from "./app/schema";
var { graphqlHTTP } = require("express-graphql");

const app: Express = express();

app.set("json spaces", 4);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: rootQueryType,
    graphiql: true,
  })
);
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
