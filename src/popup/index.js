import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import PopUp from "./popup";
import { ACCESS_TOKEN } from "../config";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  request: async operation => {
    operation.setContext({
      headers: {
        Authorization: `token ${ACCESS_TOKEN}`
      }
    });
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <PopUp />
  </ApolloProvider>,
  document.getElementById("popup")
);
