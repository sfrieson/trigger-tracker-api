import 'babel-core/register'
import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express'
import mongoose from 'mongoose'

import schema from './schema'

if (process.env.NODE_ENV === 'development') require('dotenv').config()

const app = express()

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}))
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true})
.then(function () {
  app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}...`))
})
