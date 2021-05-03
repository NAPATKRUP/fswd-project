import { gql } from '@apollo/client';

export const REMOVE_ADDRESS_BY_ID_MUTATION = gql`
  mutation($id: MongoID!) {
    removeAddressById(_id: $id) {
      recordId
    }
  }
`;
