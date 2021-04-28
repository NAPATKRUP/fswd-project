import { gql } from '@apollo/client';

export const ADD_ITEM_IN_CART_MUTATION = gql`
  mutation($productId: MongoID!) {
    addItemInCart(productId: $productId) {
      status
      items {
        product {
          _id
          name
          brand
          price
          promotion {
            name
            type
            ... on Giveaway {
              condition
              amount
            }
            ... on SaleFlat {
              condition
              discount
            }
            ... on SalePercent {
              condition
              discount
            }
          }
        }
        amount
      }
      totalPrice
      promotionDiscount
      totalFinalPrice
    }
  }
`;
