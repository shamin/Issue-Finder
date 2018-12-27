import React, { Component } from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import AddOptions from '../components/container/options'

const Container = styled.div`
  width: 600px;
  background: #FCFCFC;
  margin: 0 auto;
  height: 100vh;
  overflow: scroll;
  border-left: 1px solid #EFF0F4;
  border-right: 1px solid #EFF0F4;
  font-family: "Roboto", sans-serif;
  .logo{
    padding: 50px 0;
    text-align: center;
    .logo-icon{
      width: 70px;
    }
    .name{
      padding: 0;
      margin: 0;
      text-transform: uppercase;
      color: #393770;
    }
  }
`;


export default class Options extends Component {
  render() {
    return (
      <Container>
        <div className="logo">
          <img className="logo-icon" src={logo} />
          <h1 className="name">Issue Finder</h1>
        </div>
        <AddOptions/>
      </Container>
    );
  }
}
