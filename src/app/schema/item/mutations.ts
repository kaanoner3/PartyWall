import { mutationWithClientMutationId } from "graphql-relay";
import {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLResolveInfo,
    GraphQLObjectType,
} from "graphql";
import { ItemType } from "./resolvers";
const db = require("../../../app/db");

const itemModelManager = db.sequelize.models;

export const createItemMutation = mutationWithClientMutationId({
    name: "createItemMutation",
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
            type: ItemType,
            resolve: (payload) => payload,
        },
    },
    mutateAndGetPayload: async ({ username, password }) => {
        try {
            throw new Error('Not implemented yet')

        } catch (e) {
            throw new Error(`createItemMutation ${e}`);
        }
    },
});
