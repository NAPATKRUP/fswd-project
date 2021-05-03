import { DocumentNode, gql } from '@apollo/client';

export const UPDATE_SALEFLAT_PROMOTION_BY_ID_MUTATION: DocumentNode = gql`
  mutation(
    $_id: MongoID!
    $slug: String!
    $name: String!
    $image: String
    $description: String!
    $startDate: Date!
    $endDate: Date!
    $condition: Float
    $discount: Float!
  ) {
    updateSaleFlatPromotionById(
      _id: $_id
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
      record {
        type
        slug
        name
        image
        description
        startDate
        endDate
        condition
        discount
        createAt
        updateAt
      }
    }
  }
`;
