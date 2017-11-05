import db from './';

db.query(
  `INSERT INTO records VALUES ('quinoa');`
).then(() => process.exit())
.catch(function (err) {
  console.log(err);
  process.exit(1);
});
