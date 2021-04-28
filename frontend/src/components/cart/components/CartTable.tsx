import { FC, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { WAITING_CART_QUERY } from '../graphql/waitingCartQuery';
import { ADD_ITEM_IN_CART_MUTATION } from '../graphql/addItemInCartMutation';
import { REMOVE_ITEM_IN_CART_MUTATION } from '../graphql/removeItemInCartMutation';

import { IItem } from '../../commons/type/ICart';

interface ItemProps {
  items: IItem[];
}

const CartTable: FC<ItemProps> = ({ items }: ItemProps) => {
  const [addItemInCart] = useMutation(ADD_ITEM_IN_CART_MUTATION);
  const [removeItemInCart] = useMutation(REMOVE_ITEM_IN_CART_MUTATION);

  const handleAddItemInCart = useCallback(
    async (e, id) => {
      e.preventDefault();
      await addItemInCart({
        variables: {
          productId: id,
        },
        refetchQueries: [{ query: WAITING_CART_QUERY }],
      });
    },
    [addItemInCart]
  );

  const handleRemoveItemInCart = useCallback(
    async (e, id) => {
      e.preventDefault();
      await removeItemInCart({
        variables: {
          productId: id,
        },
        refetchQueries: [{ query: WAITING_CART_QUERY }],
      });
    },
    [removeItemInCart]
  );

  return (
    <div className="px-20 pt-20">
      <div className="text-2xl">Your Cart</div>
      <table className="table-auto w-full mt-10">
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Amount</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item: IItem, index: number) => (
            <tr key={item.product._id}>
              <td className="text-center">{index + 1}</td>
              <td>
                {item.product.brand} | {item.product.name}
                {item.product.promotion && (
                  <div className="text-xs m-1 bg-gold-300 rounded-full p-1 text-center w-full">
                    {item.product.promotion?.type === 'Giveaway' && (
                      <p>
                        {item.product.promotion?.type} | สินค้านี้มีโปรโมชั่นเมื่อซื้อครบ{' '}
                        {item.product.promotion?.condition} ชิ้น แถมอีก{' '}
                        {item.product.promotion?.amount} ชิ้นฟรี
                      </p>
                    )}
                    {item.product.promotion?.type === 'SaleFlat' && (
                      <p>
                        {item.product.promotion?.type} | สินค้านี้มีโปรโมชั่นเมื่อซื้อครบ{' '}
                        {item.product.promotion?.condition} บาท จะได้รับส่วนลด{' '}
                        {item.product.promotion?.discount} บาท
                      </p>
                    )}
                    {item.product.promotion?.type === 'SalePercent' && (
                      <p>
                        {item.product.promotion?.type} | สินค้านี้มีโปรโมชั่นเมื่อซื้อครบ{' '}
                        {item.product.promotion?.condition} บาท จะได้รับส่วนลด{' '}
                        {item.product.promotion?.discount} %
                      </p>
                    )}
                  </div>
                )}
              </td>
              <td className="text-right">{item.amount}</td>
              <td className="text-right">{item.amount * item.product.price}</td>
              <td>
                <button
                  onClick={(e) => handleAddItemInCart(e, item.product._id)}
                  className="border-2 border-black hover:bg-dark-500 px-2 py-1 rounded-full font-bold mx-1"
                >
                  +
                </button>
                <button
                  onClick={(e) => handleRemoveItemInCart(e, item.product._id)}
                  className="border-2 border-black hover:bg-dark-500 px-2 py-1 rounded-full font-bold mx-1"
                >
                  -
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
