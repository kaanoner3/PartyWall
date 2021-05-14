import { fromGlobalId, toGlobalId } from "graphql-relay";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import { GraphQLError } from "graphql";

const db = require("../index");
const userModelManager = db.sequelize.models.user;

export const getAllUsers = async () => {
  return await userModelManager.findAll({
    order: [["createdAt", "DESC"]],
  });
};

export const getUser = async (globalId: string | undefined) => {
  const _id: any = globalId && fromGlobalId(globalId);
  return await userModelManager.findByPk(_id.id);
};

export const getUsername = async (userId: number) => {
  const user = await userModelManager.findByPk(userId);
  return user.dataValues.username;
};

export const signUp = async (username: string, password: string) => {
  const _username = username.trim().toLowerCase();
  const hashed = await bcrypt.hash(password, 10);
  let _user = await userModelManager.findOne({
    where: { username: _username },
  });

  if (username.length < 4) {
    throw new GraphQLError("Username must be at least four character");
  }
  if (password.length < 4) {
    throw new GraphQLError("Password must be at least four character");
  }
  if (_user === null) {
    _user = await userModelManager.create({
      username: _username,
      password: hashed,
    });
    const token = jwt.sign({ id: _user.id }, config.jwtSecretKey);
    const globalId = toGlobalId("User", _user.id);
    return { token, id: globalId };
  } else {
    throw new GraphQLError(`User is already exist `);
  }
};

export const loginUser = async (username: string, password: string) => {
  const _username = username.trim().toLowerCase();

  const _user = await userModelManager.findOne({
    where: { username: _username },
  });

  if (!_user) {
    throw new GraphQLError("Password or username is invalid");
  }
  const valid = await bcrypt.compare(password, _user.dataValues.password);

  if (!valid) {
    throw new GraphQLError("Password or username is invalid");
  }

  const userId = _user.dataValues.id;
  const token = jwt.sign({ id: userId }, config.jwtSecretKey);
  const globalId = toGlobalId("User", userId);

  return { token, id: globalId };
};
