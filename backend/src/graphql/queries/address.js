import { schemaComposer } from 'graphql-compose';

import { AddressModel, AddressTC } from '../../models/address';

export const addressById = AddressTC.getResolver('findById');
export const addressByMany = AddressTC.getResolver('findMany');

export const addressByUserContext = schemaComposer.createResolver({
  name: 'productBySlug',
  kind: 'query',
  type: [AddressTC.getType()],
  resolve: async ({ context }) => {
    const { _id: userId } = context.user;
    const address = await AddressModel.find({ userId });
    return address;
  },
});
