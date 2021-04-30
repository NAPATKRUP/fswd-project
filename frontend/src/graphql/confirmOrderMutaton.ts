import { gql } from '@apollo/client';

export const CONFIRM_ORDER_MUTATION = gql`
  mutation($orderId: MongoID!, $addressId: MongoID!) {
    confirmOrder(orderId: $orderId, addressId: $addressId) {
      _id
    }
  }
`;
