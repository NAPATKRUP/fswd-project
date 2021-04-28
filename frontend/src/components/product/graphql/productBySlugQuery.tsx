import { gql } from '@apollo/client';

export const PRODUCT_BY_SLUG_QUERY = gql`
  query($slug: String!) {
    productBySlug(slug: $slug) {
      name
      brand
      image
      description
      promotion {
        name
        type
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
        startDate
        endDate
      }
      stock
      price
      createAt
      updateAt
    }
  }
`;
