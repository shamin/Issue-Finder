import React from "react";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { ACCESS_TOKEN } from "../config";
import {
  Container,
  Header,
  Body
} from "../components/presentational/containers";
import Card from "../components/presentational/card";
import logo from "../assets/logo.svg";
import refresh from "../assets/refresh.svg";
import github from "../assets/github-blue.svg";
import githubIcon from "../assets/github-white.svg";
import { ImageButton } from "../components/presentational/button";

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

client
  .query({
    query: gql`
      {
        search(
          first: 10
          query: "label:help-wanted label:good-first-issue state:open language:JavaScript"
          type: ISSUE
        ) {
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
  })
  .then(result => console.log(result));

export default class PopUp extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <img className="logo" src={logo} />
          <h1 className="name">Issue Finder</h1>
          <ImageButton src={refresh} />
          <ImageButton
            src={github}
            href="https://github.com/shaminmeerankutty/Issue-Finder"
          />
        </Header>
        <Body>
          <Card>
            <div className="header">
              <img className="icon" src={githubIcon} />
              <p className="repo">nodejs/node</p>
              <p className="date">24-12-2018</p>
            </div>
            <p className="title">
              Add `input` option to async child_process methods
            </p>
            <p className="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </Card>
        </Body>
      </Container>
    );
  }
}
