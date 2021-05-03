import { DocumentNode, gql } from '@apollo/client';

export const PRODUCT_BY_ID_QUERY: DocumentNode = gql`
  query($id: MongoID!) {
    productById(_id: $id) {
      _id
      slug
      name
      brand
      description
      image
      price
      stock
      promotionId
      promotion {
        name
      }
      createAt
      updateAt
    }
  }
`;
