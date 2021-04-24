import { PaymentTC } from "../../models/payment";

export const paymentById = PaymentTC.getResolver("findById");
