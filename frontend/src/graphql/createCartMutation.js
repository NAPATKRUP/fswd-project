import { gql } from "@apollo/client";

export const CREATE_CART_MUTATION = gql`
  mutation($userId: String!, $status: EnumCartStatus!) {
    createCart(record: { userId: $userId, status: $status }) {
      recordId
    }
  }
`;
