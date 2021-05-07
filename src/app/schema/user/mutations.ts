import { mutationWithClientMutationId } from "graphql-relay";
import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLResolveInfo,
  GraphQLObjectType,
} from "graphql";
import { UserType } from "./resolvers";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import has = Reflect.has;
import { where } from "sequelize";

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
  },
  mutateAndGetPayload: async ({ username, password }) => {
    try {
      const { user } = db.sequelize.models;

      const _username = username.trim().toLowerCase();
      const hashed = await bcrypt.hash(password, 10);
      let _user = await user.findOne({ where: { username: _username } });
      console.log(_user, hashed);

      if (_user === null) {
        _user = await user.create({
          username: _username,
          password: hashed,
        });
        const token = jwt.sign({ id: _user._id }, "supersecretkey");
        return { token };
      } else {
        throw new Error(`User is already exist `);
      }
    } catch (e) {
      throw new Error(`createUserMutation ${e}`);
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
  },
  mutateAndGetPayload: async ({ username, password }) => {
    const { user } = db.sequelize.models;
    const _username = username.trim().toLowerCase();

    const _user = await user.findOne({
      where: { username: _username },
    });
    // if there is no user, throw an authentication error
    if (!_user) {
      throw new Error("Password or username is invalid");
    }
    console.log(password, _user);
    const valid = await bcrypt.compare(password, _user.dataValues.password);

    if (!valid) {
      throw new Error("Password or username is invalid");
    }
    const token = jwt.sign({ id: _user._id }, "supersecretkey");
    return { token };
  },
});
