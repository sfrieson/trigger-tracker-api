require('dotenv').config();
const fs = require('fs');
const path = require('path');
const util = require('util');

const db = require('./').default;

const readFilePromise = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const listOfCommands = [
  'create', // Create tables
  'drop', // Drop tables
  'migrate' // Drop tables
];

const [command] = process.argv.slice(2);

switch (command) {
  case 'create':
    create().then(end);
    break;
  case 'drop':
    drop().then(end);
    break;
  case 'migrate':
    migrate().then(end);
    break;
  default:
    console.log(`"${command}" is not a valid command. Please choose one of the following:`);
    console.log(listOfCommands.join('\n'));
    process.exit(1);
}

async function migrate () {
  const versionRE = /\/\* version: (\d+_[\w-]+) \*\//;
  const schema = await readFile('./schema.sql');
  const [, currentVersion] = schema.match(versionRE);
  const migrations = await fs.readdirSync(path.resolve(__dirname, './migration'), 'utf8');
  const toBeApplied = migrations.filter(version => version > currentVersion).sort();
  console.log(currentVersion, toBeApplied);

  let i;
  let version;
  for (i = 0; i < toBeApplied.length; i++) {
    version = toBeApplied[i];

    const query = await readFile(`./migration/${version}/up.sql`);
    await db.query(query);
  }
  const newLatest = toBeApplied[toBeApplied.length - 1];
  const newSchema = schema.replace(versionRE, `/* version: ${newLatest} */`);
  await writeFile(path.resolve(__dirname, './schema.sql'), newSchema);
}

async function create () {
  const query = await readFile('./schema.sql');
  return db.query(query).catch(catchErr);
}
function drop () {
  return db.query('DROP TABLE records; DROP TABLE reports;')
  .catch(catchErr);
}

async function readFile (relativePath) {
  return readFilePromise(path.resolve(__dirname, relativePath), 'utf8');
}

function end () {
  process.exit();
}

function catchErr (err) {
  console.log(err);
  process.exit(1);
}
