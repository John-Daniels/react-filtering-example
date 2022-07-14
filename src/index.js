import React from "react"
import ReactDOM from "react-dom/client"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"

import App from "./App"
import "./index.css"

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
