import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql";
import { ItemType } from "../item/resolvers";
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  connectionFromPromisedArray,
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
  toGlobalId,
} from "graphql-relay";

const db = require("../../../app/db");

const userModelManager = db.sequelize.models.user;
const itemModelManager = db.sequelize.models.item;

// const { nodeInterface, nodeField } = nodeDefinitions(
//   (globalId) => {}
//    (obj) => (obj.ships ? factionType : shipType),
// );
// export { nodeInterface, nodeField };

const { connectionType: itemConnection } = connectionDefinitions({
  nodeType: ItemType,
});

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
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
        return await userModelManager.findByPk(args.userId);
      },
    },
  }),
});
