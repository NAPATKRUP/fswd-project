import { DocumentNode, gql } from '@apollo/client';

export const PRODUCT_ALL_QUERY: DocumentNode = gql`
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
      }
      createAt
      updateAt
    }
  }
`;
