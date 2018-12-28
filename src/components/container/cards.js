import React from "react";
import Card from "../presentational/card";
import { graphql } from "react-apollo";
import { ISSUES_QUERY } from "../../utils/constants";
import Spinner from "../presentational/spinner";
import { Status } from "../presentational/containers";
import InfiniteScroll from "react-infinite-scroller";

const IssueList = ({ data: { loading, error, search, loadMore } }) => {
  if (loading) return <Spinner />;
  if (error) return <Status>Some Error Occured.</Status>;
  const { edges = [], pageInfo: { hasNextPage } = {} } = search || {};
  return (
    <InfiniteScroll
      loadMore={loadMore}
      hasMore={hasNextPage}
      loader={<Spinner />}
      useWindow={false}
    >
      <div>
        {edges.map(issue => (
          <Card issue={issue.node} key={issue.node.title} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

const withQuery = graphql(ISSUES_QUERY, {
  options: ({ query }) => ({ variables: { query } }),
  props: ({ data }) => ({
    data: {
      ...data,
      loadMore: () => {
        return data.fetchMore({
          variables: { end: data.search.pageInfo.endCursor },
          updateQuery: (previousResult = {}, { fetchMoreResult = {} }) => {
            const previousSearch = previousResult.search || {};
            const currentSearch = fetchMoreResult.search || {};
            const previousNodes = previousSearch.edges || [];
            const currentNodes = currentSearch.edges || [];
            return {
              ...previousResult,
              search: {
                ...previousSearch,
                edges: [...previousNodes, ...currentNodes],
                pageInfo: currentSearch.pageInfo
              }
            };
          }
        });
      }
    }
  })
});

const IssuesListWithQuery = withQuery(IssueList);

const Cards = ({ labels, language }) => {
  const query = `label:${labels.join(
    " label:"
  )} state:open language:${language}`;
  console.log(query);
  return <IssuesListWithQuery query={query} />;
};

export default Cards;
