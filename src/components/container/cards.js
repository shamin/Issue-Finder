import React from "react";
import Card from "../presentational/card";
import { Query } from "react-apollo";
import { ISSUES_QUERY } from "../../constants";
import Spinner from "../presentational/spinner";

const Cards = () => {
  return (
    <Query query={ISSUES_QUERY}>
      {({ data, loading, error }) => {
        if(loading) return <Spinner />
        if(error) return <p>Some Error Occured</p>
        return (
          <div>
            {data.search.edges.map(issue => (
              <Card issue={issue.node} key={issue.node.title} />
            ))}
          </div>
        );
      }}
    </Query>
  );
};

export default Cards;
