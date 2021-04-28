import { gql } from '@apollo/client';

export const HOMEPAGE_QUERY = gql`
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
