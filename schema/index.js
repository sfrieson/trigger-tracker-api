import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

const typeDefs = `
  # The data input for the record query
  type Record {
    food: String!
  }

  type Report {
    symptom: String!
  }

  input RecordData {
    food: String!
  }

  # The data input for the report query
  input ReportData {
    symptom: String!
  }

  # The list of possible queries
  type Query {
    # Retrieve the most recent records
    records (count: Int): [Record!]

    # Retrieve the most recent reports
    reports (count: Int): [Report!]
  }

  # The list of possible mutations
  type Mutation {
    # Record an entry to the food diary
    record (data: RecordData!): Boolean!

    # Report an adverse physical reaction
    report (data: ReportData!): Boolean!
  }
`;

export default makeExecutableSchema({typeDefs, resolvers});
