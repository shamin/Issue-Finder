import React from "react";
import {
  Container,
  Header,
  Body
} from "../components/presentational/containers";
import logo from "../assets/logo.svg";
import refresh from "../assets/refresh.svg";
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
  }

  componentDidMount() {
    getDatas("accessToken", ({ accessToken }) => {
      if (accessToken !== undefined) this.setState({ accessToken });
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
          {this.state.accessToken.length > 0 ? (
            <ApolloProvider client={client}>
              <IssuesList />
            </ApolloProvider>
          ) : (
            <div>Add accessToken in options
              <button onClick={()=>{chrome.runtime.openOptionsPage()}}>options</button>
            </div>
          )}
        </Body>
      </Container>
    );
  }
}
