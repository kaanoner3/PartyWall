import { mutationWithClientMutationId } from "graphql-relay";
import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLResolveInfo,
  GraphQLObjectType,
} from "graphql";
import {UserQueryType, UserType} from "./resolvers";
const db = require("../../../app/db");

export const createUserMutation = mutationWithClientMutationId({
  name: "createUserMutation",
  inputFields: {
    username: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
  },
  outputFields: {
    user: {
      type: UserType,
      resolve: (payload) => payload,
    },
  },
  mutateAndGetPayload: async ({ username, password }) => {
    const { user } = db.sequelize.models;
    return await user.create({ username, password });
  },
});
