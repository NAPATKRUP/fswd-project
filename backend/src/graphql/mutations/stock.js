import { StockTC } from "../../models/stock";

export const createStock = StockTC.getResolver("createOne");
export const updateStockById = StockTC.getResolver("updateById");
export const removeStockById = StockTC.getResolver("removeById");
