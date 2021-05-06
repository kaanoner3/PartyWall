import { mutationWithClientMutationId } from "graphql-relay";
import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLResolveInfo,
  GraphQLObjectType,
} from "graphql";
import { CategoryType } from "./resolvers";
const db = require("../../../app/db");

const categoryModelManager = db.sequelize.models.category;

export const createCategoryMutation = mutationWithClientMutationId({
  name: "createCategoryMutation",
  inputFields: {
    name: {
      type: GraphQLString,
    },
  },
  outputFields: {
    user: {
      type: CategoryType,
      resolve: (payload) => payload,
    },
  },
  mutateAndGetPayload: async ({ name }) => {
    try {
      return await categoryModelManager.create({ name });
    } catch (e) {
      throw new Error(`createCategoryMutation ${e}`);
    }
  },
});
