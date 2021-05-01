import React, { useQuery } from '@apollo/client';
import { CUSTOMER_ORDERS_QUERY } from '../../../graphql/customerOrdersQuery';

const CustomerOrders = () => {
  const { loading, data, error } = useQuery(CUSTOMER_ORDERS_QUERY);

  if (loading) return <div>Loading ... </div>;

  if (error) return <div>Error</div>;

  const renderCartItems = (item: any, cartId: number) => {
    return (
      <div className="mt-2" key={cartId + item._id + ''}>
        <p className="ml-4">item id: {item._id}</p>
        <p className="ml-4">product name: {item.product.name}</p>
        <p className="ml-4">product brand: {item.product.brand}</p>
        <p className="ml-4">product price: {item.product.price}</p>
      </div>
    );
  };

  const renderOrder = (order: any) => {
    return (
      <div className="mt-4" key={order._id}>
        <p>order id: {order._id}</p>
        <p>user id: {order.userId}</p>
        <p>cart id: {order.cartId}</p>
        <p>order status: {order.orderStatus}</p>
        {order.cart.items.map((item: any) => renderCartItems(item, order.cartId))}
        <hr />
      </div>
    );
  };

  return (
    // <>{data.customerOrders}</>
    <>
      {data?.customerOrders?.length === 0 && <p>คุณไม่มีคำสั่งซื้อ</p>}

      {data?.customerOrders?.length !== 0 &&
        data?.customerOrders?.map((order: any) => renderOrder(order))}
    </>
  );
};

export default CustomerOrders;
