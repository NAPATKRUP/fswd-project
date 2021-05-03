import { gql } from '@apollo/client';

export const UPDATE_USER_MUTATION = gql`
  mutation($displayName: String!, $password: String!) {
    updateUser(displayName: $displayName, password: $password) {
      status
    }
  }
`;
