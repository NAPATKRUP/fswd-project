import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation($username: String!, $password: String!, $displayName: String!) {
    register(username: $username, password: $password, displayName: $displayName) {
      token
      user {
        _id
        role
        displayName
      }
    }
  }
`;
