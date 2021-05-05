import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql";
import { ItemType } from "../item/resolvers";
const db = require("../../../app/db");

const { user } = db.sequelize.models;

export const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: { type: GraphQLInt },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    token: { type: GraphQLString },
  }),
});

export const UserQueryType = new GraphQLObjectType({
  name: "userQuery",
  description: "",
  fields: () => ({
    allPeople: {
      type: new GraphQLList(UserType),
      resolve: async (payload) => {
        console.log({ payload });
        return await user.findAll();
      },
    },
    person: {
      type: UserType,
      args: { userId: { type: new GraphQLNonNull(GraphQLInt) } },
      resolve: async (rootValue, args: { userId?: number }) => {
        console.log({ user });
        return await user.findByPk(args.userId);
      },
    },
    items: {
      type: new GraphQLList(ItemType),
      resolve: (person) => person.items,
    },
  }),
});
