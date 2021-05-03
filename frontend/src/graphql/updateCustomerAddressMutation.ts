import { gql } from '@apollo/client';

export const UPDATE_CUSTOMER_ADDRESS_MUTATION = gql`
  mutation($id: MongoID!, $name: String!, $addressDetail: String!, $userId: String!) {
    updateAddressById(
      _id: $id
      record: { name: $name, addressDetail: $addressDetail, userId: $userId }
    ) {
      recordId
    }
  }
`;
