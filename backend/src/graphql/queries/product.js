import { ProductTC } from "../../models/product";

export const productById = ProductTC.getResolver("findById");
