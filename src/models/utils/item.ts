import { fromGlobalId, ResolvedGlobalId } from "graphql-relay";
import { CreateItemMutationInputs } from "../../../index";

const db = require("../index");
const itemModelManager = db.sequelize.models.item;

const getIdFromGlobalId = (globalId: string): ResolvedGlobalId => {
  return fromGlobalId(globalId);
};

export const getAllItems = async () => {
  return await itemModelManager.findAll({
    order: [["createdAt", "DESC"]],
  });
};

export const getItem = async (globalId: string) => {
  const id = getIdFromGlobalId(globalId).id;
  return await itemModelManager.findByPk(id);
};

export const createItem = async (input: CreateItemMutationInputs) => {
  const { userId } = input;
  await itemModelManager.create({
    ...input,
    userId,
  });
};

export const findAllUserItems = async (userId: number) => {
  return await itemModelManager.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
  });
};

export const removeItem = async (itemId: string) => {
  const _id: any = getIdFromGlobalId(itemId).id;
  await itemModelManager.destroy({ where: { id: _id } });
  return _id;
};
