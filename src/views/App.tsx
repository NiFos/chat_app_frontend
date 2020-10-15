/* eslint-disable react-hooks/exhaustive-deps */
import { ApolloProvider } from "@apollo/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { CheckLogin } from "../components/checkLogin";
import { Header } from "../components/header";
import { apolloClient } from "../lib/apolloClient";
import { Routes } from "./Routes";

function App() {
  return (
    <div className="App">
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <CheckLogin>
            <Header />
            <Routes />
          </CheckLogin>
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
}

export default App;
