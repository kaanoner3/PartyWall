import { mutationWithClientMutationId, toGlobalId } from "graphql-relay";
import { GraphQLString, GraphQLNonNull, GraphQLID } from "graphql";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      const { user } = db.sequelize.models;

      const _username = username.trim().toLowerCase();
      const hashed = await bcrypt.hash(password, 10);
      let _user = await user.findOne({ where: { username: _username } });

      if (_user === null) {
        _user = await user.create({
          username: _username,
          password: hashed,
        });
        const token = jwt.sign({ id: _user.id }, "supersecretkey");
        const globalId = toGlobalId("User", _user.id);
        return { token, id: globalId };
      } else {
        throw new Error(`User is already exist `);
      }
    } catch (e) {
      throw new Error(`${e}`);
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
    const { user } = db.sequelize.models;
    const _username = username.trim().toLowerCase();

    const _user = await user.findOne({
      where: { username: _username },
    });
    const userId = _user.dataValues.id;
    if (!_user) {
      throw new Error("Password or username is invalid");
    }
    const valid = await bcrypt.compare(password, _user.dataValues.password);

    if (!valid) {
      throw new Error("Password or username is invalid");
    }

    const token = jwt.sign({ id: userId }, "supersecretkey");
    const globalId = toGlobalId("User", userId);

    return { token, id: globalId };
  },
});
