import { CartTC } from "../../models/cart";

export const cartById = CartTC.getResolver("findById");
export const cartByMany = CartTC.getResolver("findMany");
