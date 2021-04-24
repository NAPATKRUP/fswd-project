import { CartTC } from "../../models/cart";

export const createCart = CartTC.getResolver("createOne");
export const updateCartById = CartTC.getResolver("updateById");
export const removeCartById = CartTC.getResolver("removeById");
