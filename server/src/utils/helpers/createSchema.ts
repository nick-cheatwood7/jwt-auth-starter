import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { UserResolver, HelloResolver } from "../../graphql/resolvers";

export const createSchema = (): Promise<GraphQLSchema> => {
  return buildSchema({
    resolvers: [UserResolver, HelloResolver],
    validate: false,
  });
};
