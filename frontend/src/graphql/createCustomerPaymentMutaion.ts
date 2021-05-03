import { gql } from '@apollo/client';

export const CREATE_CUSTOMER_PAYMENT_MUTATION = gql`
  mutation($name: String!, $fullName: String!, $cardNumber: String!, $userId: String!) {
    createPayment(
      record: { name: $name, fullName: $fullName, cardNumber: $cardNumber, userId: $userId }
    ) {
      recordId
    }
  }
`;
