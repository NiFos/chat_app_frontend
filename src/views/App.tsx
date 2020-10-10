import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./Routes";

const cache = new InMemoryCache();
const client = new ApolloClient<NormalizedCacheObject>({
  cache,
  link: ApolloLink.from([
    new HttpLink({
      uri: process.env.REACT_APP_GRAPHQL_URL || "",
    }),
  ]),
});
function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
}

export default App;
