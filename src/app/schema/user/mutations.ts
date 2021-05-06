import { mutationWithClientMutationId } from "graphql-relay";
import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLResolveInfo,
  GraphQLObjectType,
} from "graphql";
import { UserType } from "./resolvers";
const db = require("../../../app/db");

export const createUserMutation = mutationWithClientMutationId({
  name: "createUserMutation",
  inputFields: {
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    user: {
      type: UserType,
      resolve: (payload) => payload,
    },
  },
  mutateAndGetPayload: async ({ username, password }) => {
    try {
      const { user } = db.sequelize.models;
      return await user.create({ username, password });
    } catch (e) {
      throw new Error(`createUserMutation ${e}`);
    }
  },
});
