import React, { FC, useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ITEM_IN_CART_MUTATION } from '../../commons/graphql/addItemInCartMutation';
import { REMOVE_ITEM_IN_CART_MUTATION } from '../../commons/graphql/removeItemInCartMutation';
import { WAITING_CART_QUERY } from '../graphql/waitingCartQuery';

import useModal from '../../../hooks/useModal';

import { IItem } from '../../commons/type/ICart';

interface ItemProps {
  items: IItem[];
}

const Modal = React.lazy(() => import('../../commons/Modal'));

const CartTable: FC<ItemProps> = ({ items }: ItemProps) => {
  const [title, setTitle] = useState('');
  const [bodyMessage, setBodyMessage] = useState('');
  const { isShowing, toggle } = useModal(false);
  const handleStatusMessage = useCallback(
    (title: string, bodyMessage: string) => {
      setTitle(title);
      setBodyMessage(bodyMessage);
      toggle();
    },
    [toggle]
  );
  const handleCallBack = (status: boolean) => {
    if (!status) toggle();
  };

  const [addItemInCart] = useMutation(ADD_ITEM_IN_CART_MUTATION);
  const [removeItemInCart] = useMutation(REMOVE_ITEM_IN_CART_MUTATION);

  const handleAddItemInCart = useCallback(
    async (e, id) => {
      e.preventDefault();
      try {
        await addItemInCart({
          variables: {
            productId: id,
          },
          refetchQueries: [{ query: WAITING_CART_QUERY }],
        });
        return handleStatusMessage(
          'เพิ่มจำนวนสินค้าเสร็จสิ้น',
          'ระบบได้ทำการเพิ่มจำนวนรายการสินค้าที่ท่านเลือกในตะกร้าสินค้าแล้ว'
        );
      } catch ({ message }) {
        return handleStatusMessage('ทำรายการไม่สำเร็จ', message);
      }
    },
    [addItemInCart, handleStatusMessage]
  );

  const handleRemoveItemInCart = useCallback(
    async (e, id) => {
      e.preventDefault();
      try {
        await removeItemInCart({
          variables: {
            productId: id,
          },
          refetchQueries: [{ query: WAITING_CART_QUERY }],
        });
        return handleStatusMessage(
          'ลดจำนวนสินค้าเสร็จสิ้น',
          'ระบบได้ทำการลดจำนวนรายการสินค้าที่ท่านเลือกในตะกร้าสินค้าแล้ว'
        );
      } catch ({ message }) {
        return handleStatusMessage('ทำรายการไม่สำเร็จ', message);
      }
    },
    [removeItemInCart, handleStatusMessage]
  );

  return (
    <div className="px-20 pt-12">
      <Modal
        isOpen={isShowing}
        isHasAccept={false}
        isHasDecline={false}
        title={title}
        bodyMessage={bodyMessage}
        callBackFunction={handleCallBack}
      />
      <div className="text-2xl">ตะกร้าสินค้า</div>
      <table className="table-auto w-full mt-10">
        <thead>
          <tr>
            <th>รายการ</th>
            <th>ชื่อสินค้า</th>
            <th>จำนวนที่ซื้อ</th>
            <th>ราคา</th>
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
                  className="border-2 border-black hover:bg-dark-100 hover:text-white-100 w-8 px-2 py-1 rounded-full font-semibold ml-2"
                >
                  +
                </button>
                <button
                  onClick={(e) => handleRemoveItemInCart(e, item.product._id)}
                  className="border-2 border-black hover:bg-dark-100 hover:text-white-100 w-8 px-2 py-1 rounded-full font-semibold ml-1 mb-2"
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
