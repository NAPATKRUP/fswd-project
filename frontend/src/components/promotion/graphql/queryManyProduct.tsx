import { gql } from "@apollo/client";

export const PromotionQuery = gql`
  query {
    promotionByMany {
      _id
      slug
      name
      description
      startDate
      endDate
      image
      updateAt
      products {
        name
        brand
      }
    }
  }
`;
