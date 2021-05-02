import { gql } from '@apollo/client';

export const ADDRESS_BY_ORDERID_QUERY = gql`
  query($orderId: MongoID!) {
    orderById(_id: $orderId) {
      _id
      address {
        name
        addressDetail
      }
      orderStatus
    }
  }
`;
