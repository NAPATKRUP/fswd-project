import { gql } from '@apollo/client';

export const PROMOTION_ALL_QUERY = gql`
  query {
    promotionByMany {
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
