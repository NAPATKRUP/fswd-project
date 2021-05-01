import { gql } from '@apollo/client';

export const ORDER_BY_ID_QUERY = gql`
  query($orderId: MongoID!) {
    orderById(_id: $orderId) {
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
