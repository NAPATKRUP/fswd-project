import { gql } from '@apollo/client';

export const ADDRESS_BY_USER_QUERY = gql`
  query($userId: String!) {
    addressByMany(filter: { userId: $userId }) {
      name
      addressDetail
    }
  }
`;
