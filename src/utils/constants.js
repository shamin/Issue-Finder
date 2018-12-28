import gql from "graphql-tag";

export const ISSUES_QUERY = gql`
  query searchIssues($query: String!, $end: String) {
    search(first: 10, query: $query, type: ISSUE, after: $end) {
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
              url
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const labels = [
  "up-for-grabs",
  "bug",
  "documentation",
  "trivial",
  "feature",
  "tests",
  "html",
  "css",
  "enhancement",
  "design",
  "refactoring",
  "optimization",
  "translation",
  "beginner",
  "accessibility",
  "easy-pick",
  "good-first-issue",
  "first-timers-only",
  "hacktoberfest"
];
