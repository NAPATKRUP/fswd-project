import { gql } from '@apollo/client';

export const CHECKOUT_MUTATION = gql`
  mutation {
    checkoutCart {
      status
      items {
        product {
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
