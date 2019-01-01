import React from "react";
import {
  Container,
  Header,
  Body,
  Status
} from "../components/presentational/containers";
import logo from "../assets/logo.svg";
import options from "../assets/options.svg";
import github from "../assets/github-blue.svg";
import { ImageButton } from "../components/presentational/button";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { getDatas } from "../utils/functions";
import IssuesList from "../components/container/issueslist";


import { clientId } from "../config";
import { handleProviderResponse, parseRedirectFragment} from "../utils/auth"


export default class PopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: ""
    };
    this.openOptions = this.openOptions.bind(this);
  }

  componentDidMount() {
    getDatas("accessToken", ({ accessToken }) => {
      if (accessToken !== undefined) this.setState({ accessToken });
    });
  }

  openOptions(e) {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  }

  login() {
    console.log("Login --------");

    console.log(chrome.identity.getRedirectURL("issue-finder"));

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

    console.log("Login --------");
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
      <Container>
        <Header>
          <img className="logo" src={logo} />
          <h1 className="name">Issue Finder</h1>
          <ImageButton src={options} onClick={this.openOptions} />
          <ImageButton
            src={github}
            href="https://github.com/shaminmeerankutty/Issue-Finder"
          />
        </Header>
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
      </Container>
    );
  }
}
