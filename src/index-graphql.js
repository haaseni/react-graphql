import express from 'express'
import cors from 'cors'
import graphqlHTTP from 'express-graphql'
import { schema } from './data/schema'

// Graphql server config
const app = express()

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(8000, () => console.log('Running server on port localhost:8000/graphql'))
