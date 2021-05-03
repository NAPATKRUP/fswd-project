import { DocumentNode, gql } from '@apollo/client';

export const UPDATE_PRODUCT_BY_ID_MUTATION: DocumentNode = gql`
  mutation(
    $_id: MongoID!
    $slug: String!
    $name: String!
    $brand: String!
    $image: String
    $price: Float!
    $stock: Float!
    $description: String!
  ) {
    updateProductById(
      _id: $_id
      record: {
        slug: $slug
        name: $name
        brand: $brand
        image: $image
        price: $price
        description: $description
        stock: $stock
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
