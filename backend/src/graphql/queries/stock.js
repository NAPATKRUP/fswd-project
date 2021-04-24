import { StockTC } from "../../models/stock";

export const stockById = StockTC.getResolver("findById");
