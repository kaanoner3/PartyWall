import { fromGlobalId } from "graphql-relay";

const db = require("../../../app/db");
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
