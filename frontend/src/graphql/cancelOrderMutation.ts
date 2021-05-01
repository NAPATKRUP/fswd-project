import { gql } from '@apollo/client';

export const CANCEL_ORDER_MUTATION = gql`
  mutation($orderId: MongoID!) {
    cancelOrder(orderId: $orderId) {
      _id
    }
  }
`;
