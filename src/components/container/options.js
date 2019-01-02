import React from "react";
import { Input, Form, Button } from "../presentational/forms";
import Select from "react-select";
import { labels } from "../../utils/constants";
import { saveData, getDatas } from "../../utils/functions";
import { Status } from "../presentational/containers";

export default class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelsSelected: [],
      language: "",
      loading: false
    };
    this.handleLabels = this.handleLabels.bind(this);
    this.handleLanguage = this.handleLanguage.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    getDatas("language", ({ language }) => {
      this.setState({ language });
    });
    getDatas("labels", ({ labels }) => {
      this.setState({
        labelsSelected: labels.map(d => ({ value: d, label: d }))
      });
    });
  }

  handleLanguage(e) {
    this.setState({ language: e.target.value });
  }

  handleLabels(labelsSelected) {
    this.setState({ labelsSelected });
  }

  onSave(e) {
    this.setState({ loading: true });
    e.preventDefault();
    const { labelsSelected, language } = this.state;
    saveData("language", language);
    const labels = labelsSelected.map(label => label.value);
    saveData("labels", labels);
    this.setState({ loading: false, showStatus: true });
  }

  render() {
    const { labelsSelected, language, loading, showStatus } = this.state;
    const options = labels.map(d => ({ value: d, label: d }));
    return (
      <Form>
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
        {loading && <Spinner />}
        {showStatus && <Status>Saved Successfully</Status>}
        <Button onClick={this.onSave}>Save</Button>
      </Form>
    );
  }
}
