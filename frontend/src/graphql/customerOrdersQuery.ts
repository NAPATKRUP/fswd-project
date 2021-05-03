import { gql } from '@apollo/client';

export const CUSTOMER_ORDERS_QUERY = gql`
  query {
    orderByUserContext {
      _id
      orderStatus
      address {
        name
        addressDetail
      }
      payment {
        name
      }
      checkoutAt
      cancelAt
    }
  }
`;
