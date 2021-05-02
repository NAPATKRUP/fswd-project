import { gql } from '@apollo/client';

export const ORDER_BY_ID_ADMIN_QUERY = gql`
  query($orderId: MongoID!) {
    orderById(_id: $orderId) {
      _id
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
      address {
        name
        addressDetail
      }
      payment {
        name
        fullName
        cardNumber
      }
      orderStatus
      usePromotion
      userId
    }
  }
`;
