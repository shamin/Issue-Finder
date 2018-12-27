import React from "react";

const Card = props => {
  const { issue } = props;
  console.log(issue);
  return <div>{issue.node.title}</div>;
};

export default Card
