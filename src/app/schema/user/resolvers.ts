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
  fromGlobalId,
  globalIdField,
} from "graphql-relay";

const db = require("../../../app/db");

const userModelManager = db.sequelize.models.user;
const itemModelManager = db.sequelize.models.item;

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
          itemModelManager.findAll({
            where: { userId: user.dataValues.id },
            order: [["createdAt", "DESC"]],
          }),
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
        return await userModelManager.findAll();
      },
    },
    person: {
      type: UserType,
      args: { userId: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: async (rootValue, args: { userId?: string }) => {
        const _id: any = args.userId && fromGlobalId(args.userId);
        return await userModelManager.findByPk(_id.id);
      },
    },
    node: nodeField,
  }),
});
