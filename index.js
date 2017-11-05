import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';

import schema from './schema';

if (process.env.NODE_ENV === 'development') require('dotenv').config();

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}...`));
