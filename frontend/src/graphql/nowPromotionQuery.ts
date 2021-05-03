import { gql } from '@apollo/client';

export const NOW_PROMOTION_QUERY = gql`
  query {
    nowPromotion {
      _id
      slug
      name
      description
      startDate
      endDate
      image
    }
  }
`;
