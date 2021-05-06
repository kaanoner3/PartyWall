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
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
  toGlobalId,
} from "graphql-relay";

const db = require("../../../app/db");

const userModelManager = db.sequelize.models.user;

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
      resolve: (user, args) => {
        console.log("11111111", user, args);
        //connectionFromArray(user.ships.map(getShip), args);
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
