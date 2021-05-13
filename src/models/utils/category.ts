import { fromGlobalId } from "graphql-relay";

const db = require("../index");

const categoryModelManager = db.sequelize.models.category;

export const getCategoryName = async (categoryId: number) => {
  const category = await categoryModelManager.findByPk(categoryId);
  return category.dataValues.name;
};

export const getAllCategories = async () => {
  return await categoryModelManager.findAll({
    order: [["createdAt", "DESC"]],
  });
};

export const getCategory = async (globalId: string | undefined) => {
  const _id: any = globalId && fromGlobalId(globalId);
  return await categoryModelManager.findByPk(_id.id);
};
