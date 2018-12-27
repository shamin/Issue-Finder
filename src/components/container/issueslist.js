import React from "react";
import Cards from "../container/cards";
import { getDatas } from "../../utils/functions";

export default class IssuesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      language: ""
    };
  }

  componentDidMount() {
    getDatas("language", ({ language }) => {
      this.setState({ language });
    });
    getDatas("labels", ({ labels }) => {
      this.setState({ labels });
    });
  }

  render() {
    const { labels, language } = this.state;
    return <Cards labels={labels} language={language} />;
  }
}
