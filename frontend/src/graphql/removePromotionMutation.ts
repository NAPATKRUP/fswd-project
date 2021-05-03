import { DocumentNode, gql } from '@apollo/client';

export const REMOVE_PROMOTION_BY_ID_MUTATION: DocumentNode = gql`
  mutation($_id: MongoID!) {
    removePromotionById(_id: $_id) {
      recordId
    }
  }
`;
