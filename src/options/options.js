import React, { Component } from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";

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

const Form = styled.div`
  padding: 0 100px;
  .label{
    display: block;
    color: #393770;
    font-weight: 500;
    margin: 40px 0 10px 0;
  }
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #4D5BE7;
`

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: 1px solid #4D5BE7;
  background: #4D5BE7;
  color: #ffffff;
  margin-left: 10px;
  margin-top: 50px;
  font-size: 16px;
`


export default class Options extends Component {
  render() {
    return (
      <Container>
        <div className="logo">
          <img className="logo-icon" src={logo} />
          <h1 className="name">Issue Finder</h1>
        </div>
        <Form>
          <label className="label">Personal Access Token</label>
          <Input type="text"></Input> 
          <label className="label">Language</label>
          <Input type="text"></Input> 
          <label className="label">Label</label>
          <Input type="text"></Input> 
          <Button>Save</Button>
        </Form>
      </Container>
    );
  }
}
