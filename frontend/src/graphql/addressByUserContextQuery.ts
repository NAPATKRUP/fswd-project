import { gql } from '@apollo/client';

export const ADDRESS_BY_USERCONTEXT_QUERY = gql`
  query {
    addressByUserContext {
      _id
      name
      addressDetail
    }
  }
`;
