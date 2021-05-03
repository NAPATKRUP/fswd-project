import { schemaComposer } from 'graphql-compose';

import { PaymentModel, PaymentTC } from '../../models/payment';
import { requiredAuth } from '../middlewares';

export const paymentById = PaymentTC.getResolver('findById');
export const paymentByMany = PaymentTC.getResolver('findMany');

export const paymentByUserContext = schemaComposer
  .createResolver({
    name: 'paymentByUserContext',
    kind: 'query',
    type: [PaymentTC.getType()],
    resolve: async ({ context }) => {
      const { _id: userId } = context.user;
      const payment = await PaymentModel.find({ userId });
      return payment;
    },
  })
  .wrapResolve(requiredAuth);
