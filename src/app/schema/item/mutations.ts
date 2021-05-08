import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList,
} from "graphql";
import { itemAttributesScalarType, ItemType } from "./resolvers";
const db = require("../../../app/db");

const itemModelManager = db.sequelize.models.item;

export const createItemMutation = mutationWithClientMutationId({
  name: "createItemMutation",
  inputFields: {
    categoryId: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    quantity: { type: new GraphQLNonNull(GraphQLInt) },
    attributes: { type: itemAttributesScalarType },
  },
  outputFields: {
    item: {
      type: new GraphQLNonNull(GraphQLList(ItemType)),
      resolve: async ({ userId }) => {
        const items = itemModelManager.findAll({
          where: { userId },
          order: [["createdAt", "DESC"]],
        });

        return items;
      },
    },
  },
  mutateAndGetPayload: async (input) => {
    try {
      const { categoryId, attributes, userId, name, quantity, price } = input;
      const _id: any = fromGlobalId(userId).id;
      await itemModelManager.create({
        categoryId,
        userId: _id,
        name,
        attributes,
        quantity,
        price,
      });

      return { userId: _id };
    } catch (e) {
      throw new Error(`createItemMutation ${e}`);
    }
  },
});
export const removeItemMutation = mutationWithClientMutationId({
  name: "removeItemMutation",
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    deletedId: {
      type: GraphQLInt,
      resolve: ({ id }) => {
        return id;
      },
    },
  },
  mutateAndGetPayload: async (input) => {
    try {
      const { id } = input;
      const _id: any = fromGlobalId(id).id;
      await itemModelManager.destroy({ where: { id: _id } });
      return { id: _id };
    } catch (e) {
      throw new Error(`removeItemMutation ${e}`);
    }
  },
});
