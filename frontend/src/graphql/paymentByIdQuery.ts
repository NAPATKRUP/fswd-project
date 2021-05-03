import { gql } from '@apollo/client';

export const PAYMENT_BY_ID_QUERY = gql`
  query($id: MongoID!) {
    paymentById(_id: $id) {
      name
      fullName
      cardNumber
    }
  }
`;
