require('dotenv').config();
const fs = require('fs');
const path = require('path');

const db = require('./').default;

const listOfCommands = [
  'create', // Create tables
  'drop' // Drop tables
];

const [command] = process.argv.slice(2);

switch (command) {
  case 'create':
    create().then(end);
    break;
  case 'drop':
    drop().then(end);
    break;
  default:
    console.log(`"${command}" is not a valid command. Please choose one of the following:`);
    console.log(listOfCommands.join('\n'));
    process.exit(1);
}

function create () {
  return db.query(
    fs.readFileSync(path.resolve(__dirname, './schema.sql'), 'utf8')
  ).catch(catchErr);
}
function drop () {
  return db.query('DROP TABLE records; DROP TABLE reports;')
  .catch(catchErr);
}

function end () {
  process.exit();
}

function catchErr (err) {
  console.log(err);
  process.exit(1);
}
