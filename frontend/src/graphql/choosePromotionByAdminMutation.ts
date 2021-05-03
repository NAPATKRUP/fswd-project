import { gql } from '@apollo/client';

export const CHOOSE_PROMOTION_BY_ADMIN_MUTATION = gql`
  mutation($productId: MongoID!, $promotionId: MongoID!) {
    choosePromotionByAdmin(productId: $productId, promotionId: $promotionId) {
      _id
    }
  }
`;
