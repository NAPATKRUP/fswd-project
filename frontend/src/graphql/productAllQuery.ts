import { DocumentNode, gql } from '@apollo/client';

export const PRODUCT_ALL_QUERY: DocumentNode = gql`
  query {
    productByMany {
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
