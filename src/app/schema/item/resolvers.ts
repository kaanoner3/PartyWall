import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLScalarType,
} from "graphql";
import { fromGlobalId, globalIdField, nodeDefinitions } from "graphql-relay";
const db = require("../../../app/db");

const itemModelManager = db.sequelize.models.item;
const categoryModelManager = db.sequelize.models.category;
const userModelManager = db.sequelize.models.user;

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    // Log to NodeJS console the mapping from globalId/Node ID
    // to actual object type and id
    console.log("NodeDefinitions (globalId), id:", id);
    console.log("NodeDefinitions (globalId), type:", type);

    return id;
  },
  (obj) => {
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
      resolve: async (post, args, context, { rootValue }) => {
        return await itemModelManager.findAll({
          order: [["createdAt", "DESC"]],
        });
      },
    },
    item: {
      type: ItemType,
      args: { itemId: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: async (rootValue, args: { itemId?: string }) => {
        const _id: any = args.itemId && fromGlobalId(args.itemId);
        return await itemModelManager.findByPk(_id.id);
      },
    },
    node: nodeField,
  }),
});
