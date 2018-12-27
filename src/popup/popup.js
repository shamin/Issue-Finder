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
          <Cards />
        </Body>
      </Container>
    );
  }
}
