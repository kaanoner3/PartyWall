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
    categoryId: { type: GraphQLInt },
    userId: { type: GraphQLInt },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    quantity: { type: GraphQLInt },
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
      console.log(attributes, name);
      console.log("new item", newItem);
      return newItem;
    } catch (e) {
      throw new Error(`createItemMutation ${e}`);
    }
  },
});
