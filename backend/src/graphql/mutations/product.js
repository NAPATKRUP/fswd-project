import { ProductTC } from "../../models/product";

export const createProduct = ProductTC.getResolver("createOne");
export const updateProductById = ProductTC.getResolver("updateById");
export const removeProductById = ProductTC.getResolver("removeById");
