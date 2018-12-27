import React from "react";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { ACCESS_TOKEN } from '../config'

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  request: async operation => {
    operation.setContext({
      headers: {
        'Authorization': `token ${ACCESS_TOKEN}`
      }
    });
  },
});

client.query({
  query: gql`
    {
      search(first: 10, query: "label:help-wanted label:good-first-issue state:open language:JavaScript", type: ISSUE) {
        edges {
          node {
            ... on Issue {
              title
              bodyText
              updatedAt
              labels(first: 10) {
                edges {
                  node {
                    name
                  }
                }
              }
              url
              repository {
                nameWithOwner
              }
            }
          }
        }
      }
    }
  `
}).then(result => console.log(result));

export default class PopUp extends React.Component {
  render() {
    return <div>Popup Component</div>;
  }
}
