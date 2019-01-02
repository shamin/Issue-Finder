import React from "react";
import Cards from "../container/cards";
import { getDatas } from "../../utils/functions";
import { Status } from "../presentational/containers";
import Spinner from "../presentational/spinner";

export default class IssuesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      language: "",
      loading: true
    };
  }

  componentDidMount() {
    getDatas("language", ({ language }) => {
      getDatas("labels", ({ labels }) => {
        if (labels != undefined && language != undefined)
          this.setState({ language, labels, loading: false });
        else this.setState({ loading: false });
      });
    });
  }

  render() {
    const { labels, language, loading } = this.state;
    if (loading) return <Spinner />;
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
