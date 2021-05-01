import { DocumentNode, gql } from '@apollo/client';

export const CREATE_PRODUCT_MUTATION: DocumentNode = gql`
  mutation(
    $slug: String!
    $name: String!
    $brand: String!
    $image: String
    $price: Float!
    $description: String!
  ) {
    createProduct(
      record: {
        slug: $slug
        name: $name
        brand: $brand
        image: $image
        price: $price
        description: $description
        stock: 0
      }
    ) {
      record {
        slug
        name
        brand
        image
        price
        description
      }
    }
  }
`;
