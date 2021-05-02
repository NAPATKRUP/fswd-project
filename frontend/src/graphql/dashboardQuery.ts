import { gql } from '@apollo/client';

export const DASHBOARD_QUERY = gql`
  query {
    orderSummary {
      x
      y
    }
    orderStatusSummary {
      successTotal
      shippingTotal
    }
    productByMany(filter: { stock: 0 }) {
      _id
      name
      brand
    }
  }
`;
