import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";
import { ItemType, nodeField, nodeInterface } from "../item/resolvers";
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
  globalIdField,
} from "graphql-relay";
import { getAllUsers, getUser } from "../../models/utils/user";
import { findAllUserItems } from "../../models/utils/item";

const { connectionType: itemConnection } = connectionDefinitions({
  nodeType: ItemType,
});

export const UserType = new GraphQLObjectType({
  name: "User",
  interfaces: () => [nodeInterface],
  fields: () => ({
    id: globalIdField("User"),
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    token: { type: GraphQLString },
    items: {
      type: itemConnection,
      args: connectionArgs,
      resolve: async (user, args) => {
        return connectionFromPromisedArray(
          findAllUserItems(user.dataValues.id),
          args
        );
      },
    },
  }),
});

export const UserQueryType = new GraphQLObjectType({
  name: "userQuery",
  description: "it contains user related queries",
  fields: () => ({
    allPeople: {
      type: new GraphQLList(UserType),
      resolve: async (payload) => {
        return getAllUsers();
      },
    },
    person: {
      type: UserType,
      args: { userId: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: async (rootValue, args: { userId?: string }) => {
        return getUser(args.userId);
      },
    },
    node: nodeField,
  }),
});
