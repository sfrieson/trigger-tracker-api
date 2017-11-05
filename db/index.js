import { Pool } from 'pg';

const pool = new Pool();

export default {
  query: function (text, params, callback) {
    return pool.query(text, params, callback);
  }
};
