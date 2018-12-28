import React from "react";
import { Input, Form, Button } from "../presentational/forms";
import Select from "react-select";
import { labels } from "../../utils/constants";
import { saveData, getDatas } from "../../utils/functions";

export default class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelsSelected: [],
      accessToken: "",
      language: ""
    };
    this.handleLabels = this.handleLabels.bind(this);
    this.handleToken = this.handleToken.bind(this);
    this.handleLanguage = this.handleLanguage.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    getDatas("language", ({ language }) => {
      this.setState({ language });
    });
    getDatas("accessToken", ({ accessToken }) => {
      this.setState({ accessToken });
    });
    getDatas("labels", ({ labels }) => {
      this.setState({
        labelsSelected: labels.map(d => ({ value: d, label: d }))
      });
    });
  }

  handleToken(e) {
    this.setState({ accessToken: e.target.value });
  }

  handleLanguage(e) {
    this.setState({ language: e.target.value });
  }

  handleLabels(labelsSelected) {
    this.setState({ labelsSelected });
  }

  onSave(e) {
    e.preventDefault();
    const { labelsSelected, accessToken, language } = this.state;
    saveData("language", language);
    saveData("accessToken", accessToken);
    const labels = labelsSelected.map(label => label.value);
    saveData("labels", labels);
  }

  render() {
    const { labelsSelected, accessToken, language } = this.state;
    const options = labels.map(d => ({ value: d, label: d }));
    return (
      <Form>
        <label className="label">
          Personal Access Token
          <br />
          <span className="small-text">
            Get Personal Access Token from{" "}
            <a className="link" href="https://github.com/settings/tokens" target="__blank">https://github.com/settings/tokens</a>
          </span>
        </label>
        <Input type="text" onChange={this.handleToken} value={accessToken} />
        <label className="label">Language</label>
        <Input type="text" onChange={this.handleLanguage} value={language} />
        <label className="label">Labels</label>
        <Select
          value={labelsSelected}
          options={options}
          isMulti
          className="react-select-container"
          classNamePrefix="react-select"
          onChange={this.handleLabels}
        />
        <Button onClick={this.onSave}>Save</Button>
      </Form>
    );
  }
}
