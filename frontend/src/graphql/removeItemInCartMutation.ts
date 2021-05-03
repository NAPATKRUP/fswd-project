import { gql } from '@apollo/client';

export const REMOVE_ITEM_IN_CART_MUTATION = gql`
  mutation($productId: MongoID!) {
    removeItemInCart(productId: $productId) {
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
