import React from "react";
import Cards from "../container/cards";
import { getDatas } from "../../utils/functions";
import { Status } from "../presentational/containers";

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
    if (language.length === 0 || labels.length === 0)
      return (
        <Status>
          <p>Add Language and Labels.</p>
          <button
            className="status-button"
            onClick={() => {
              chrome.runtime.openOptionsPage();
            }}
          >
            Options
          </button>
        </Status>
      );
    return <Cards labels={labels} language={language} />;
  }
}
