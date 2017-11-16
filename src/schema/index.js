import { makeExecutableSchema } from 'graphql-tools'

import resolvers from './resolvers'

const typeDefs = `
  scalar UnixTimestamp

  # The data input for the record query
  type Record {
    attributes: [String]
    food: String!
    foodGroup: String
    homemade: Boolean
    id: ID
    solid: Boolean
    timestamp: UnixTimestamp
  }

  type Report {
    id: ID
    symptom: String!
    timestamp: UnixTimestamp
  }

  # A union for both Records and Reports for history queries
  union Data = Record | Report

  # Possible input for Recordings
  input RecordData {
    attributes: [String!]
    food: String!
    foodGroup: String
    homemade: Boolean
    solid: Boolean
    timestamp: UnixTimestamp
  }

  # Possible input for Reports
  input ReportData {
    attributes: [String!]
    symptom: String!
    timestamp: UnixTimestamp
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

    # Allows batch import of Records
    batchRecord (data: [RecordData!]!): Boolean!

    # Allows batch import of Reports
    batchReport (data: [ReportData!]!): Boolean!

    # Delete a record from the diary
    deleteRecord (id: ID!): Boolean!

    # Delete an adverse physical reaction from the diary
    deleteReport (id: ID!): Boolean!

    # Record an entry to the food diary
    record (data: RecordData!): Boolean!

    # Report an adverse physical reaction
    report (data: ReportData!): Boolean!
  }
`

export default makeExecutableSchema({typeDefs, resolvers})
