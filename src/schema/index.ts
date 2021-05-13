import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { UserQueryType } from "./user/resolvers";
import { createUserMutation, loginMutation } from "./user/mutations";
import { ItemQueryType, nodeField } from "./item/resolvers";
import { CategoryQueryType } from "./category/resolvers";
import { createCategoryMutation } from "./category/mutations";
import { createItemMutation, removeItemMutation } from "./item/mutations";

const rootMutation = new GraphQLObjectType({
  name: "rootMutation",
  fields: () => ({
    createUserMutation,
    createCategoryMutation,
    createItemMutation,
    removeItemMutation,
    loginMutation,
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
    node: nodeField,
  }),
});

export const schema: GraphQLSchema = new GraphQLSchema({
  query: rootQueryType,
  mutation: rootMutation,
});
