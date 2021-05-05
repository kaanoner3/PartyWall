import { buildSchema, GraphQLSchema } from "graphql";
import { UserType } from "./types";
import { UserMutation } from "./mutations";

export const userSchema: GraphQLSchema = new GraphQLSchema({
  query: UserType,
  mutation: UserMutation,
});
