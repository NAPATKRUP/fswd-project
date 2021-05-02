import { gql } from '@apollo/client';

export const ADMIN_ORDERS_QUERY = gql`
  query {
    orderByMany {
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
      userId
    }
  }
`;
