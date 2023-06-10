import { gql } from "@apollo/client";

export const GET_REPOSITORY_BY_ID = gql`
  query GetRepository($repoName: String!, $username: String!, $first: Int) {
    repository(name: $repoName, owner: $username) {
      description
      id
      owner {
        avatarUrl
        login
        url
      }
      pushedAt
      stargazerCount
      name
      languages(first: $first) {
        edges {
          node {
            name
          }
        }
      }
    }
  }
`;
