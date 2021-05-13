import { mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString, GraphQLNonNull, GraphQLError } from "graphql";
import { CategoryType } from "./resolvers";
const db = require("../../models");

const categoryModelManager = db.sequelize.models.category;

export const createCategoryMutation = mutationWithClientMutationId({
  name: "createCategoryMutation",
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    category: {
      type: CategoryType,
      resolve: (payload) => payload,
    },
  },
  mutateAndGetPayload: async ({ name }) => {
    try {
      return await categoryModelManager.create({ name });
    } catch (e) {
      throw new GraphQLError(`createCategoryMutation ${e}`);
    }
  },
});
