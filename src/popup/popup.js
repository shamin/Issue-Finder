import React from "react";
import { Container } from "../components/presentational/containers";
import Header from "../components/container/header";
import Body from "../components/container/body";

export default class PopUp extends React.Component {
  render() {
    return (
      <Container>
        <Header />
        <Body />
      </Container>
    );
  }
}
