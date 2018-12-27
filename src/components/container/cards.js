import React from "react";
import Card from "../presentational/card";
import { Query } from "react-apollo";
import { ISSUES_QUERY } from "../../constants";

const Cards = () => {
  return (
    <Query query={ISSUES_QUERY}>
      {({ data }) => {
        if (data.search === undefined) return null;
        return (
          <div>
            {data.search.edges.map(issue => (
              <Card issue={issue.node} key={issue.node.title}/>
            ))}
          </div>
        );
      }}
    </Query>
  );
};

export default Cards;
