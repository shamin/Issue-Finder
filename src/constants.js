import gql from "graphql-tag";

export const ISSUES_QUERY = gql`
{
  search(
    first: 10
    query: "label:help-wanted label:good-first-issue state:open language:JavaScript"
    type: ISSUE
  ) {
    edges {
      node {
        ... on Issue {
          title
          bodyText
          updatedAt
          labels(first: 10) {
            edges {
              node {
                name
              }
            }
          }
          url
          repository {
            nameWithOwner
          }
        }
      }
    }
  }
}
`
