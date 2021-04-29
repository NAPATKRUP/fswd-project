import { gql } from '@apollo/client';

export const LATESTPRODUCT_PRODUCT_QUERY = gql`
  query($productShow: Int!) {
    latestProduct(show: $productShow) {
      _id
      slug
      name
      brand
      price
      description
      image
      stock
      promotion {
        name
      }
    }
  }
`;
