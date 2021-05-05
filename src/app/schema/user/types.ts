import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import { ItemType } from "../item/types";
const User = require("../../db/user");

export const UserType = new GraphQLObjectType({
  name: "Person",
  description: "",
  fields: () => ({
    id: { type: GraphQLString },
    password: {
      type: GraphQLString,
    },
    username: { type: GraphQLString },
    items: {
      type: new GraphQLList(ItemType),
      resolve: (person) => person.items,
    },
  }),
});
