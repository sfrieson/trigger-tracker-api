import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

import Report from '../db/schema/report'
import Record from '../db/schema/record'

const defaultMaxResults = 10
const windowLengthRE = new RegExp('(?:(\\d+):)?(\\d+):(\\d\\d)')

const secLength = 1000
const minLength = secLength * 60
const hrLength = minLength * 60
const dayLength = hrLength * 24

export default {
  Record: {
    id: ({_id}) => _id
  },
  Report: {
    id: ({_id}) => _id
  },
  Data: {
    __resolveType (obj, ctx, info) {
      if (obj.food) return 'Record'
      if (obj.symptom) return 'Report'
      return null
    }
  },
  UnixTimestamp: new GraphQLScalarType({
    name: 'UnixTimestamp',
    description: 'Milliseconds since epoch',
    parseValue (value) {
      return parseInt(value, 10)
    },
    serialize (value) {
      return value
    },
    parseLiteral (ast) {
      if (ast.kind === Kind.INT) return parseInt(ast.value, 10)
      return null
    }
  }),
  Query: {
    records: function (_, {count = defaultMaxResults}) {
      return Record.find()
      .limit(count)
    },
    reports: function (_, {count = defaultMaxResults}) {
      return Report.find()
      .limit(count)
    },
    history: async function (_, {count: userCount, windowLength, timeStart}) {
      const useDefaultLimit = !userCount && !windowLength
      const count = useDefaultLimit ? defaultMaxResults : userCount

      const filters = {}
      if (timeStart) filters.timestamp = {$lt: timeStart}
      else if (windowLength) filters.timestamp = {$lt: Date.now()}

      if (windowLength) {
        const [, days = 0, hours, minutes] = windowLength.match(windowLengthRE)
        filters.timestamp.$gt = filters.timestamp.$lt - (days * dayLength) - (hours * hrLength) - (minutes * minLength)
      }

      let records = await Record.find(filters).sort({timestamp: -1}).limit(count)
      let reports = await Report.find(filters).sort({timestamp: -1}).limit(count)
      const history = [...records, ...reports].sort((a, b) => b.timestamp > a.timestamp)
      return history.slice(0, count)
    }
  },
  Mutation: {
    batchRecord: async function (_, {data}) {
      const newRecords = await Record.bulkWrite(data.map(d => ({insertOne: {document: d}})))
      return newRecords.n
    },
    batchReport: async function (_, {data}) {
      const newReports = await Report.bulkWrite(data.map(d => ({insertOne: {document: d}})))
      return newReports.n
    },
    record: function (_, {data}) {
      return Record.create(data)
    },
    report: function (_, {data}) {
      return Report.create(data)
    },
    deleteRecord: function (_, {id}) {
      return Record.findById(id).remove()
    },
    deleteReport: function (_, {id}) {
      return Report.findById(id).remove()
    }
  }
}
