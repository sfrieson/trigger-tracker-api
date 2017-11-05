import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

const typeDefs = `
  type Query {
    timesTwo (num: Int!): Int!
  }
`;

export default makeExecutableSchema({typeDefs, resolvers});
