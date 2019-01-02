import React from "react";

import { Header } from '../presentational/containers';
import { ImageButton } from "../presentational/button";
import logo from "../../assets/logo.svg";
import options from "../../assets/options.svg";
import github from "../../assets/github-blue.svg";

export default class HeaderComponent extends React.Component {
  openOptions(e) {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  }

  render() {
    return (
      <Header>
        <img className="logo" src={logo} />
        <h1 className="name">Issue Finder</h1>
        <ImageButton src={options} onClick={this.openOptions} />
        <ImageButton
          src={github}
          href="https://github.com/shaminmeerankutty/Issue-Finder"
        />
      </Header>
    );
  }
}
