import { gql } from '@apollo/client';

export const ALL_PROMOTION_QUERY = gql`
  query {
    promotionByMany {
      _id
      name
    }
  }
`;
