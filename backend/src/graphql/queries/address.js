import { schemaComposer } from 'graphql-compose';

import { AddressModel, AddressTC } from '../../models/address';
import { requiredAuth } from '../middlewares';

export const addressById = AddressTC.getResolver('findById');
export const addressByMany = AddressTC.getResolver('findMany');

export const addressByUserContext = schemaComposer
  .createResolver({
    name: 'addressByUserContext',
    kind: 'query',
    type: [AddressTC.getType()],
    resolve: async ({ context }) => {
      const { _id: userId } = context.user;
      const address = await AddressModel.find({ userId });
      return address;
    },
  })
  .wrapResolve(requiredAuth);
