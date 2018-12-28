import gql from "graphql-tag";

export const ISSUES_QUERY = gql`
  query searchIssues($query: String!) {
    search(first: 10, query: $query, type: ISSUE) {
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
