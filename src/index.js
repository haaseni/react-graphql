import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'
import App from './App'
import * as constants from './constants'
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import * as serviceWorker from './serviceWorker'

const cache = new InMemoryCache()
const link = new HttpLink({
  uri: constants.GRAPHQL_URL
})

const client = new ApolloClient({
    cache,
    link
})

// React website
ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>    
    </React.StrictMode>,
    document.getElementById('root')
);
  
serviceWorker.unregister();