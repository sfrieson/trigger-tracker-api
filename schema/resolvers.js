import db from '../db';

const defaultMaxResults = 10;

export default {
  Query: {
    records: function (_, {count = defaultMaxResults}) {
      return db.query({
        text: 'SELECT * FROM records LIMIT $1;',
        values: [count]
      }).then(res => res.rows);
    },
    reports: function (_, {count = defaultMaxResults}) {
      return db.query({
        text: 'SELECT * FROM reports LIMIT $1;',
        values: [count]
      }).then(res => res.rows);
    }
  },
  Mutation: {
    record: function (_, {data}) {
      const keys = Object.keys(data);

      return db.query({
        text: `INSERT INTO
          records (${keys.join(', ')})
          VALUES (${keys.map((_, i) => `$${i + 1}`).join(', ')});`,
        values: keys.map(key => data[key])
      }).then(() => true)
      .catch(() => false);
    },
    report: function (_, {data}) {
      const keys = Object.keys(data);

      return db.query({
        text: `INSERT INTO
          reports (${keys.join(', ')})
          VALUES (${keys.map((_, i) => `$${i + 1}`).join(', ')});`,
        values: keys.map(key => data[key])
      });
    }
  }
};
