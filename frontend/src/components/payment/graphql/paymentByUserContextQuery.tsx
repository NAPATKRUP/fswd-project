import { gql } from '@apollo/client';

export const PAYMENT_BY_USERCONTEXT_QUERY = gql`
  query {
    paymentByUserContext {
      _id
      name
      fullName
      cardNumber
    }
  }
`;
