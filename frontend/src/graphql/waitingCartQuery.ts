import { gql } from '@apollo/client';

export const WAITING_CART_QUERY = gql`
  query {
    waitingCart {
      status
      items {
        _id
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
