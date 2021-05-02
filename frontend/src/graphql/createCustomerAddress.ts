import { gql } from '@apollo/client';

export const CREATE_CUSTOMER_ADDRESS = gql`
  mutation($name: String!, $addressDetail: String!, $userId: String!) {
    createAddress(record: { name: $name, addressDetail: $addressDetail, userId: $userId }) {
      recordId
    }
  }
`;
