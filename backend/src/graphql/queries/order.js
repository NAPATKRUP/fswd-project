import { OrderTC } from "../../models/order";

export const orderById = OrderTC.getResolver("findById");
