import {
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
} from "graphql";

export const ItemType = new GraphQLObjectType({
    name: "Item",
    fields: () => ({
        id: { type: GraphQLString },
        name: {
            type: GraphQLString,
            resolve: (item) => item.name,
        },
        price: {
            type: GraphQLInt,
            resolve: (item) => item.price,
        },
    }),
});
