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

  openOptions(e){
    e.preventDefault()
    chrome.runtime.openOptionsPage()
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
          <ImageButton src={options} onClick={this.openOptions}/>
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
              <p className="status-text">Add Access Token in options</p>
              <button className="status-button" onClick={this.openOptions}>Options</button>
            </Status>
          )}
        </Body>
      </Container>
    );
  }
}
