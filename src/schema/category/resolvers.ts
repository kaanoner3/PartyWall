import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql";
import { getAllCategories, getCategory } from "../../models/utils/category";

export const CategoryType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
  }),
});

export const CategoryQueryType = new GraphQLObjectType({
  name: "categoryQuery",
  description: "It contains category related queries",
  fields: () => ({
    allCategories: {
      type: new GraphQLList(CategoryType),
      resolve: async (payload) => {
        return getAllCategories();
      },
    },
    category: {
      type: CategoryType,
      args: { categoryId: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: async (rootValue, args: { categoryId?: string }) => {
        return args.categoryId && getCategory(args.categoryId);
      },
    },
  }),
});
