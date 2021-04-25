import { gql } from "@apollo/client";

export const PRODUCTFILTER_QUERY = gql`
  query($typeFilter: String!, $name: String, $minPrice: Int, $maxPrice: Int) {
    filterProductResolver(
      typeFilter: $typeFilter
      name: $name
      minPrice: $minPrice
      maxPrice: $maxPrice
    ) {
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
      updateAt
    }
  }
`;
