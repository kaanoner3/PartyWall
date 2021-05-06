import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql";
const db = require("../../../app/db");

const categoryModelManager = db.sequelize.models.category;

export const CategoryType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
  }),
});

export const CategoryQueryType = new GraphQLObjectType({
  name: "itemQuery",
  description: "It contains category related queries",
  fields: () => ({
    allCategories: {
      type: new GraphQLList(CategoryType),
      resolve: async (payload) => {
        return await categoryModelManager.findAll();
      },
    },
    category: {
      type: CategoryType,
      args: { categoryId: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: async (rootValue, args: { categoryId?: string }) => {
        return await categoryModelManager.findByPk(args.categoryId);
      },
    },
  }),
});
