import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query GetRepositories($first: Int) {
    viewer {
      login
      repositories(first: $first) {
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
