import { PaymentTC } from "../../models/payment";

export const createPayment = PaymentTC.getResolver("createOne");
export const updatePaymentById = PaymentTC.getResolver("updateById");
export const removePaymentById = PaymentTC.getResolver("removeById");
