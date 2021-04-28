import { gql } from '@apollo/client';

export const AVAILABLE_PROMOTION_QUERY = gql`
  query {
    availablePromotion {
      _id
      slug
      name
      description
      startDate
      endDate
      image
      updateAt
      products {
        _id
        slug
        name
        brand
      }
    }
  }
`;