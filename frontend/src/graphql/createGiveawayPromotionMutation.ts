import { DocumentNode, gql } from '@apollo/client';

export const CREATE_GIVEAWAY_PROMOTION_MUTATION: DocumentNode = gql`
  mutation(
    $slug: String!
    $name: String!
    $image: String
    $description: String!
    $startDate: Date!
    $endDate: Date!
    $condition: Float
    $amount: Float!
  ) {
    createGiveawayPromotion(
      record: {
        slug: $slug
        name: $name
        image: $image
        description: $description
        startDate: $startDate
        endDate: $endDate
        condition: $condition
        amount: $amount
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
        amount
        condition
      }
    }
  }
`;
