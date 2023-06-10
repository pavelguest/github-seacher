import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query GetRepositories(
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    viewer {
      login
      repositories(first: $first, last: $last, after: $after, before: $before) {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
        edges {
          node {
            id
            name
            pushedAt
            stargazerCount
            url
            owner {
              login
            }
          }
        }
      }
    }
  }
`;
