import { DocumentNode, gql } from '@apollo/client';

export const CREATE_SALEFLAT_PROMOTION_MUTATION: DocumentNode = gql`
  mutation(
    $slug: String!
    $name: String!
    $image: String
    $description: String!
    $startDate: Date!
    $endDate: Date!
    $condition: Float
    $discount: Float!
  ) {
    createSaleFlatPromotion(
      record: {
        slug: $slug
        name: $name
        image: $image
        description: $description
        startDate: $startDate
        endDate: $endDate
        condition: $condition
        discount: $discount
      }
    ) {
      recordId
      record {
        slug
        name
        image
        description
        startDate
        endDate
        discount
        condition
      }
    }
  }
`;
