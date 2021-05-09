import { fromGlobalId } from "graphql-relay";

const db = require("../../../app/db");
const itemModelManager = db.sequelize.models.item;

export const getAllItems = async () => {
  return await itemModelManager.findAll({
    order: [["createdAt", "DESC"]],
  });
};

export const getItem = async (globalId: string | undefined) => {
  const _id: any = globalId && fromGlobalId(globalId);
  return await itemModelManager.findByPk(_id.id);
};
