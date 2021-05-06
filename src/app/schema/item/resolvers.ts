import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from "graphql";

import { globalIdField } from "graphql-relay";

export const ItemType = new GraphQLObjectType({
  name: "Item",

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
  }),
});
