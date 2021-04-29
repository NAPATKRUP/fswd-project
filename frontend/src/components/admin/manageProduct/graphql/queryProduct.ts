import { DocumentNode, gql } from '@apollo/client';

export const PRODUCT_QUERY_ALL: DocumentNode = gql`
  query($limit: Int) {
    productByMany(limit: $limit) {
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

export const PRODUCT_QUERY_BY_ID: DocumentNode = gql`
  query($id: String!) {
    productById(_id: $id) {
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

export const PRODUCT_QUERY_BY_SLUG: DocumentNode = gql`
  query($slug: String!) {
    productFindOne(filter: { slug: $slug }) {
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
