import { gql } from '@apollo/client';

export const CHECKOUT_MUTATION = gql`
  mutation {
    checkoutCart {
      _id
    }
  }
`;
