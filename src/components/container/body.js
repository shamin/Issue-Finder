import React from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import IssuesList from "./issueslist";
import { Body, Status } from "../presentational/containers";
import { getDatas } from "../utils/functions";
import { clientId } from "../config";
import { handleProviderResponse, parseRedirectFragment } from "../utils/auth";

export default class BodyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: ""
    };
  }

  componentDidMount() {
    getDatas("accessToken", ({ accessToken }) => {
      if (accessToken !== undefined) this.setState({ accessToken });
    });
  }

  login() {
    const redirectUri = chrome.identity.getRedirectURL("issue-finder");
    const redirectRe = new RegExp(redirectUri + "[#?](.*)");

    const options = {
      interactive: true,
      url:
        "https://github.com/login/oauth/authorize" +
        "?client_id=" +
        clientId +
        "&redirect_uri=" +
        encodeURIComponent(redirectUri)
    };

    chrome.identity.launchWebAuthFlow(options, function(redirectUri) {
      console.log(
        "launchWebAuthFlow completed",
        chrome.runtime.lastError,
        redirectUri
      );
      if (chrome.runtime.lastError) {
        callback(new Error(chrome.runtime.lastError));
        return;
      }
      const matches = redirectUri.match(redirectRe);
      if (matches && matches.length > 1)
        handleProviderResponse(parseRedirectFragment(matches[1]));
      else callback(new Error("Invalid redirect URI"));
    });
  }

  render() {
    const client = new ApolloClient({
      uri: "https://api.github.com/graphql",
      request: async operation => {
        operation.setContext({
          headers: {
            Authorization: `token ${this.state.accessToken}`
          }
        });
      }
    });
    return (
      <Body>
        {this.state.accessToken.length > 0 ? (
          <ApolloProvider client={client}>
            <IssuesList />
          </ApolloProvider>
        ) : (
          <Status>
            <p className="status-text">Sign in with github</p>
            <button className="status-button" onClick={this.login}>
              Login
            </button>
          </Status>
        )}
      </Body>
    );
  }
}
