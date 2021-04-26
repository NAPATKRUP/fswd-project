import { gql } from "@apollo/client";

export const PRODUCT_BY_SLUG_QUERY = gql`
  query($slug: String!) {
    productBySlug(slug: $slug) {
      name
      brand
      price
      description
      image
      createAt
      updateAt
      stock
      image
    }
  }
`;
