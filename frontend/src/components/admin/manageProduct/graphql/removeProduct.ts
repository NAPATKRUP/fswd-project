import { DocumentNode, gql } from '@apollo/client';

export const PRODUCT_REMOVE_BY_ID_MUTATION: DocumentNode = gql`
  mutation($_id: MongoID!) {
    removeProductById(_id: $_id) {
      recordId
    }
  }
`;
