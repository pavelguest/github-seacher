import { gql } from "@apollo/client";

export const SEARCH_REPOSITORIES = gql`
  query SearchRepositories(
    $query: String!
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    search(
      query: $query
      type: REPOSITORY
      first: $first
      last: $last
      after: $after
      before: $before
    ) {
      repositoryCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      edges {
        node {
          ... on Repository {
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
