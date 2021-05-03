import { gql } from '@apollo/client';

export const UPDATE_CUSTOMER_PAYMENT_MUTATION = gql`
  mutation(
    $id: MongoID!
    $name: String!
    $fullName: String!
    $cardNumber: String!
    $userId: String!
  ) {
    updatePaymentById(
      _id: $id
      record: { name: $name, fullName: $fullName, cardNumber: $cardNumber, userId: $userId }
    ) {
      recordId
    }
  }
`;
