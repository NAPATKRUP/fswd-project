import { gql } from '@apollo/client';

export const FILTER_PRODUCT_QUERY = gql`
  query($typeFilter: String!, $name: String, $minPrice: Int, $maxPrice: Int) {
    filterProduct(typeFilter: $typeFilter, name: $name, minPrice: $minPrice, maxPrice: $maxPrice) {
      _id
      slug
      name
      brand
      description
      image
      price
      stock
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
      }
    }
  }
`;
