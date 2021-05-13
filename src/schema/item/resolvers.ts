import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLScalarType,
} from "graphql";
import { fromGlobalId, globalIdField, nodeDefinitions } from "graphql-relay";
import { getAllItems, getItem } from "../../models/utils/item";
import { getUser } from "../../models/utils/user";
import { UserQueryType, UserType } from "../user/resolvers";
const db = require("../../models");
const Item = require("../../models/item");
const User = require("../../models/item");

const itemModelManager = db.sequelize.models.item;
const categoryModelManager = db.sequelize.models.category;
const userModelManager = db.sequelize.models.user;

// @ts-ignore
const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === "Item") {
      return getItem(id);
    }
    if (type === "User") {
      return getUser(id);
    }
    return null;
  },
  // @ts-ignore
  (obj) => {
    if (obj instanceof Item) {
      return ItemType;
    } else if (obj instanceof User) {
      return UserType;
    }
    return null;
  }
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

export const ItemType: any = new GraphQLObjectType({
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
        const category = await categoryModelManager.findByPk(categoryId);
        return category.dataValues.name;
      },
    },
    userName: {
      type: GraphQLString,
      resolve: async (rootValue) => {
        const { userId } = rootValue.dataValues;
        const user = await userModelManager.findByPk(userId);
        return user.dataValues.username;
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
      resolve: async () => {
        return getAllItems();
      },
    },
    item: {
      type: ItemType,
      args: { itemId: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: async (rootValue, args: { itemId?: string }) => {
        return getItem(args.itemId);
      },
    },
    node: nodeField,
  }),
});
