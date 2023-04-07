import { ApolloServer } from '@apollo/server';
import typeDefs from './graphql/typedefs';
import resolvers from './graphql/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default server;
