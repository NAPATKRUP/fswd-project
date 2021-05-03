import { DocumentNode, gql } from '@apollo/client';

export const PROMOTION_BY_ID_QUERY: DocumentNode = gql`
  query($id: MongoID!) {
    promotionById(_id: $id) {
      _id
      type
      slug
      name
      image
      description
      startDate
      endDate
      ... on Giveaway {
        condition
        amount
      }
      ... on SaleFlat {
        condition
        discount
      }
      ... on SalePercent {
        condition
        discount
      }
      createAt
      updateAt
    }
  }
`;
