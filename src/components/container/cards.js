import React from "react";
import Card from "../presentational/card";

const Cards = props => {
  const issues = props.data;
  return issues.map(issue => <Card issue={issue.node} />);
};

export default Cards
