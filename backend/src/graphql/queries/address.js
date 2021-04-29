import { AddressTC } from '../../models/address';

export const addressById = AddressTC.getResolver('findById');
export const addressByMany = AddressTC.getResolver('findMany');
