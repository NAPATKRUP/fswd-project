import { gql } from '@apollo/client';

export const PAYMENT_ORDER_MUTATION = gql`
  mutation($orderId: MongoID!, $paymentId: MongoID!) {
    paymentOrder(orderId: $orderId, paymentId: $paymentId) {
      _id
    }
  }
`;
