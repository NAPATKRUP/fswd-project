import { gql } from '@apollo/client';

export const CUSTOMER_ORDERS_QUERY = gql`
  query {
    customerOrders {
      _id
      userId
      cartId
      cart {
        items {
          _id
          product {
            name
            brand
            price
          }
          amount
        }
        totalPrice
        promotionDiscount
        totalFinalPrice
      }
      orderStatus
      usePromotion
    }
  }
`;
