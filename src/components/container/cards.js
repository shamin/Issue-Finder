import React from "react";
import Card from "./card";

const Cards = props => {
  const issues = props.data;
  return issues.map(issue => <Card issue={issue} />);
};

export default Cards
