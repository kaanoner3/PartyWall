import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { UserQueryType } from "./user/resolvers";
import { createUserMutation } from "./user/mutations";
import { ItemQueryType } from "./item/resolvers";
import { CategoryQueryType } from "./category/resolvers";
import {createCategoryMutation} from "./category/mutations";

const rootMutation = new GraphQLObjectType({
  name: "rootMutation",
  fields: () => ({
    createUserMutation,
    createCategoryMutation,
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
    itemQuery: {
      type: ItemQueryType,
      resolve: (rootValue) => rootValue,
    },
    categoryQuery: {
      type: CategoryQueryType,
      resolve: (rootValue) => rootValue,
    },
  }),
});

export const schema: GraphQLSchema = new GraphQLSchema({
  query: rootQueryType,
  mutation: rootMutation,
});
