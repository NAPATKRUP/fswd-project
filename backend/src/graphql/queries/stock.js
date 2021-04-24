import { StockTC } from "../../models/stock";

export const stockById = StockTC.getResolver("findById");
export const stockByMany = StockTC.getResolver("findMany");
