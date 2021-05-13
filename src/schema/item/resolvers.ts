import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLScalarType,
  GraphQLError,
} from "graphql";
import { globalIdField } from "graphql-relay";
import {  getAllItems, getItem } from "../../models/utils/item";
import { getUsername } from "../../models/utils/user";
import {getCategoryName} from "../../models/utils/category";
const db = require("../../models");
const graphqlSequelize = require("graphql-sequelize");

const { nodeInterface, nodeField } = graphqlSequelize.createNodeInterface(
  db.sequelize
);

export { nodeInterface, nodeField };

export const itemAttributesScalarType = new GraphQLScalarType({
  name: "attributesScalar",
  description: "item attributes",

  serialize: (value) => {
    return value;
  },
  parseValue: (value) => {
    return value;
  },
  parseLiteral: (value) => {
    if (value.kind === "ObjectValue") {
      const obj: any = {};
      value.fields.forEach((item: any) => {
        obj[item.name.value] = item.value.value;
      });
      return obj;
    }
    return null;
  },
});
export const itemAttributesType = new GraphQLObjectType({
  name: "attributes",
  description: "item attributes",
  fields: () => ({
    description: { type: GraphQLString },
    volume: { type: GraphQLInt },
    weight: { type: GraphQLInt },
  }),
});

export const ItemType = new GraphQLObjectType({
  name: "Item",
  fields: () => ({
    id: globalIdField("Item"),
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    quantity: { type: GraphQLInt },
    attributes: { type: itemAttributesType },
    categoryId: { type: GraphQLInt },
    userId: { type: GraphQLInt },

    categoryName: {
      type: GraphQLString,
      resolve: async (rootValue) => {
        const { categoryId } = rootValue.dataValues;
        return await getCategoryName(categoryId)
      },
    },
    userName: {
      type: GraphQLString,
      resolve: async (rootValue) => {
        const { userId } = rootValue.dataValues;
        return await getUsername(userId);
      },
    },
  }),
  interfaces: () => [nodeInterface],
});

export const ItemQueryType = new GraphQLObjectType({
  name: "itemQuery",
  description: "It contains item related queries",

  fields: () => ({
    allItems: {
      type: new GraphQLList(ItemType),
      resolve: async (query, args, ctx) => {
        if (ctx.isAuthenticated) {
          return getAllItems();
        } else {
          throw new GraphQLError("User is not authenticated");
        }
      },
    },
    item: {
      type: ItemType,
      args: { itemId: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: async (rootValue, args: { itemId?: string }, ctx) => {
        if (ctx.isAuthenticated) {
          return args.itemId && getItem(args.itemId);
        } else {
          throw new GraphQLError("User is not authenticated");
        }
      },
    },
    node: nodeField,
  }),
});
