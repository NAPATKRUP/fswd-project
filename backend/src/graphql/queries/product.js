import { ProductTC } from "../../models/product";

export const productById = ProductTC.getResolver("findById");
export const productByMany = ProductTC.getResolver("findMany");
