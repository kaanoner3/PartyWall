import { mutationWithClientMutationId } from "graphql-relay";
import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList,
  GraphQLError,
} from "graphql";
import { itemAttributesScalarType, ItemType } from "./resolvers";
import {
  createItem,
  findAllUserItems,
  removeItem,
} from "../../models/utils/item";
import { CreateItemMutationInputs } from "../../../index";

export const createItemMutation = mutationWithClientMutationId({
  name: "createItemMutation",
  inputFields: {
    categoryId: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    quantity: { type: new GraphQLNonNull(GraphQLInt) },
    attributes: { type: itemAttributesScalarType },
  },
  outputFields: {
    item: {
      type: new GraphQLNonNull(GraphQLList(ItemType)),
      resolve: async ({ userId }: { userId: number }) => {
        return findAllUserItems(userId);
      },
    },
  },
  mutateAndGetPayload: async (input: CreateItemMutationInputs, ctx: any) => {
    try {
      if (ctx.isAuthenticated) {
        await createItem({ ...input, userId: ctx.userId });
        return { userId: ctx.userId };
      } else {
        throw new GraphQLError("User is not authenticated");
      }
    } catch (e) {
      throw new GraphQLError(`createItemMutation ${e}`);
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
  mutateAndGetPayload: async (input, ctx: any) => {
    try {
      if (ctx.isAuthenticated) {
        const { id } = input;
        const removedId = removeItem(id);
        return { id: removedId };
      } else {
        throw new GraphQLError("User is not authenticated");
      }
    } catch (e) {
      throw new GraphQLError(`removeItemMutation ${e}`);
    }
  },
});
