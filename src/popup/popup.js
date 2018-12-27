import React from "react";
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
import { Query } from "react-apollo";
import { ISSUES_QUERY } from "../constants";
import Cards from "../components/container/cards";

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
          <Query query={ISSUES_QUERY}>
            {({ data }) => {
              if (data.search === undefined) return null;
              return (
                <div>
                  <Cards data={data.search.edges}/>
                  {/* {data.search.edges.map(e => (
                    <Card>
                      <div className="header">
                        <img className="icon" src={githubIcon} />
                        <p className="repo">nodejs/node</p>
                        <p className="date">24-12-2018</p>
                      </div>
                      <p className="title">
                        {e.node.title}
                      </p>
                      <p className="description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                    </Card>
                  ))} */}
                </div>
              );
            }}
          </Query>
          {/* <Card>
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
          </Card> */}
        </Body>
      </Container>
    );
  }
}
