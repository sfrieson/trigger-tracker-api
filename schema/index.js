import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

const typeDefs = `
  scalar UnixTimestamp

  # The data input for the record query
  type Record {
    timestamp: UnixTimestamp
    food: String!
    foodGroup: String
    homemade: Boolean
    solid: Boolean
    attributes: [String]
  }

  type Report {
    timestamp: UnixTimestamp
    symptom: String!
  }

  # A union for both Records and Reports for history queries
  union Data = Record | Report

  # Possible input for Recordings
  input RecordData {
    food: String!
    foodGroup: String
    homemade: Boolean
    attributes: [String!]
  }

  # Possible input for Reports
  input ReportData {
    symptom: String!
  }

  # The list of possible queries
  type Query {
    # Retrieve the most recent records
    records (count: Int): [Record!]

    # Retrieve the most recent reports
    reports (count: Int): [Report!]

    # Retrieve past inputs
    history (count: Int, windowLength: String, timeStart: UnixTimestamp): [Data!]
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
