import { PaymentTC } from "../../models/payment";

export const paymentById = PaymentTC.getResolver("findById");
export const paymentByMany = PaymentTC.getResolver("findMany");
