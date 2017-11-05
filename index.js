import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { Client } from 'pg';

import schema from './schema';

if (process.env.NODE_ENV === 'development') require('dotenv').config();

const client = new Client();

const app = express();

app.use(async function (request, response, next) {
  await client.connect();

  const res = await client.query('SELECT $1::text as message', ['Hello world!']);
  console.log(res.rows[0].message);

  await client.end();

  return next();
});

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}...`));
