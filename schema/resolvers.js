export default {
  Query: {
    records: function (_, {count}) {
      return [{food: 'fake peanutbutter'}];
    },
    reports: function (_, {count}) {
      return [{symptom: 'headache'}];
    }
  },
  Mutation: {
    record: function (_, {data}) {
      return !!data;
    },
    report: function (_, {data}) {
      return !!data;
    }
  }
};
