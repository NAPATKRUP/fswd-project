import { gql } from '@apollo/client';

export const ADDRESS_BY_ID_QUERY = gql`
  query($addressId: MongoID!) {
    addressById(_id: $addressId) {
      name
      addressDetail
      userId
    }
  }
`;
