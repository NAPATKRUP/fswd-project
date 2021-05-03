import { gql } from '@apollo/client';

export const ADDRESS_BY_ID_QUERY = gql`
  query($id: MongoID!) {
    addressById(_id: $id) {
      name
      addressDetail
    }
  }
`;
