import { gql } from '@apollo/client';

export const REMOVE_PAYMENT_BY_ID_MUTATION = gql`
  mutation($id: MongoID!) {
    removePaymentById(_id: $id) {
      recordId
    }
  }
`;
