import { gql } from '@apollo/client';

export const CHANGE_STATUS_BY_ADMIN_MUTATION = gql`
  mutation($orderId: MongoID!, $status: String!) {
    changeStatusByAdmin(orderId: $orderId, status: $status) {
      _id
    }
  }
`;
