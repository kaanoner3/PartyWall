import { mutationWithClientMutationId } from "graphql-relay";
import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLResolveInfo,
  GraphQLObjectType,
  GraphQLInt,
} from "graphql";
import {
  itemAttributesScalarType,
  itemAttributesType,
  ItemType,
} from "./resolvers";
const db = require("../../../app/db");

const itemModelManager = db.sequelize.models.item;

export const createItemMutation = mutationWithClientMutationId({
  name: "createItemMutation",
  inputFields: {
    categoryId: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    quantity: { type: new GraphQLNonNull(GraphQLInt) },
    attributes: { type: itemAttributesScalarType },
  },
  outputFields: {
    item: {
      type: ItemType,
      resolve: (payload) => payload,
    },
  },
  mutateAndGetPayload: async (input) => {
    try {
      const { categoryId, attributes, userId, name, quantity, price } = input;
      const newItem = await itemModelManager.create({
        categoryId,
        userId,
        name,
        attributes,
        quantity,
        price,
      });
      return newItem;
    } catch (e) {
      throw new Error(`createItemMutation ${e}`);
    }
  },
});
export const removeItemMutation = mutationWithClientMutationId({
  name: "removeItemMutation",
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
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
      await itemModelManager.destroy({ where: { id } });
      return { id };
    } catch (e) {
      throw new Error(`removeItemMutation ${e}`);
    }
  },
});
