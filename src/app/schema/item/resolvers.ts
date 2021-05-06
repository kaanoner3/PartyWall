import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql";
const db = require("../../../app/db");

const itemModelManager = db.sequelize.models.item;
const categoryModelManager = db.sequelize.models.category;

export const ItemType = new GraphQLObjectType({
  name: "Item",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLInt },
    quantity: { type: GraphQLInt },
    volume: { type: GraphQLInt },
    weight: { type: GraphQLInt },
    category: {
      type: GraphQLString,
      resolve: async (rootValue) => {
        console.log("item category resolver", rootValue);
        return await categoryModelManager.findByPk(rootValue.categoryId).name;
      },
    },
  }),
});

export const ItemQueryType = new GraphQLObjectType({
  name: "itemQuery",
  description: "It contains item related queries",
  fields: () => ({
    allItems: {
      type: new GraphQLList(ItemType),
      resolve: async () => {
        return await itemModelManager.findAll();
      },
    },
    item: {
      type: ItemType,
      args: { itemId: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: async (rootValue, args: { itemId?: string }) => {
        return await itemModelManager.findByPk(args.itemId);
      },
    },
  }),
});
