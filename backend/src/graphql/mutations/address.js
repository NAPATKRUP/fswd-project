import { AddressTC } from "../../models/address";

export const createAddress = AddressTC.getResolver("createOne");
export const updateAddressById = AddressTC.getResolver("updateById");
export const removeAddressById = AddressTC.getResolver("removeById");
