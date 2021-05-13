import { mutationWithClientMutationId, toGlobalId } from "graphql-relay";
import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLError,
} from "graphql";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import { loginUser, signUp } from "../../models/utils/user";

const db = require("../../models");

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
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token,
    },
    userId: {
      type: GraphQLString,
      resolve: ({ id }) => id,
    },
  },
  mutateAndGetPayload: async ({ username, password }) => {
    try {
      return signUp(username, password);
    } catch (e) {
      throw new GraphQLError(`${e}`);
    }
  },
});

export const loginMutation = mutationWithClientMutationId({
  name: "loginMutation",
  inputFields: {
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token,
    },
    userId: {
      type: GraphQLID,
      resolve: ({ id }) => id,
    },
  },
  mutateAndGetPayload: async ({ username, password }) => {
    return loginUser(username, password);
  },
});
