import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { UserQueryType } from "./user/resolvers";
import { createUserMutation } from "./user/mutations";
import { ItemType } from "./item/resolvers";

const rootMutation = new GraphQLObjectType({
  name: "rootMutation",
  fields: () => ({
    createUserMutation,
  }),
});
export const rootQueryType = new GraphQLObjectType({
  name: "query",
  description: "",
  fields: () => ({
    userQuery: {
      type: UserQueryType,
      resolve: (rootValue) => rootValue,
    },
  }),
});
export const schema: GraphQLSchema = new GraphQLSchema({
  query: rootQueryType,
  mutation: rootMutation,
});
