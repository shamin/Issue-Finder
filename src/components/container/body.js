import React from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import IssuesList from "./issueslist";
import { Body, Status } from "../presentational/containers";
import { getDatas, saveData } from "../../utils/functions";
import { clientId } from "../../config";
import {
  handleProviderResponse,
  parseRedirectFragment
} from "../../utils/auth";

export default class BodyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: "",
      loading: true
    };
    this.client = null;
    this.login = this.login.bind(this);
    this.authCallback = this.authCallback.bind(this);
    this.setTokenAndClient = this.setTokenAndClient.bind(this);
  }

  componentDidMount() {
    getDatas("accessToken", ({ accessToken }) => {
      if (accessToken !== undefined) {
        this.setTokenAndClient(accessToken);
      } else {
        this.setState({ loading: false });
      }
    });
  }

  setTokenAndClient(accessToken) {
    this.client = new ApolloClient({
      uri: "https://api.github.com/graphql",
      request: async operation => {
        operation.setContext({
          headers: {
            Authorization: `token ${accessToken}`
          }
        });
      }
    });
    this.setState({ accessToken, loading: false });
    console.log(this.client);
  }

  login() {
    this.setState({ loading: true });
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

    chrome.identity.launchWebAuthFlow(options, redirectUri => {
      if (chrome.runtime.lastError) {
        this.authCallback(new Error(chrome.runtime.lastError));
        return;
      }
      const matches = redirectUri.match(redirectRe);
      if (matches && matches.length > 1) {
        handleProviderResponse(
          parseRedirectFragment(matches[1]),
          this.authCallback
        );
      } else this.authCallback(new Error("Invalid redirect URI"));
    });
  }

  authCallback(error, accessToken) {
    if (error) {
      console.error("Error logging in", error);
    } else {
      this.setTokenAndClient(accessToken);
      saveData("accessToken", accessToken);
    }
  }

  render() {
    const { loading, accessToken } = this.state;
    console.log(accessToken.length, this.client);
    return (
      <Body loading={loading}>
        {this.client !== null &&
        accessToken !== undefined &&
        accessToken.length > 0 ? (
          <ApolloProvider client={this.client}>
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
