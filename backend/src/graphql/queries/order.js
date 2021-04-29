import { OrderTC } from '../../models/order';

export const orderById = OrderTC.getResolver('findById');
export const orderByMany = OrderTC.getResolver('findMany');
