import Report from '../db/schema/report';
import Record from '../db/schema/record';

const defaultMaxResults = 10;

export default {
  Query: {
    records: function (_, {count = defaultMaxResults}) {
      return Record.find()
      .limit(count);
    },
    reports: function (_, {count = defaultMaxResults}) {
      return Report.find()
      .limit(count);
    }
  },
  Mutation: {
    record: function (_, {data}) {
      const newRecord = new Record(data);

      return newRecord.save();
    },
    report: function (_, {data}) {
      const newReport = new Report(data);

      return newReport.save();
    }
  }
};
