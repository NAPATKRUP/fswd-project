import { FC, lazy, useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ITEM_IN_CART_MUTATION } from '../../../graphql/addItemInCartMutation';
import { REMOVE_ITEM_IN_CART_MUTATION } from '../../../graphql/removeItemInCartMutation';
import { WAITING_CART_QUERY } from '../../../graphql/waitingCartQuery';

import { PlusIcon, MinusIcon } from '@heroicons/react/solid';
import { ShoppingCartIcon } from '@heroicons/react/outline';

import useModal from '../../../hooks/useModal';

import { IItem } from '../../commons/type/ICart';

interface ItemProps {
  items: IItem[];
}

const Modal = lazy(() => import('../../commons/Modal'));

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
    <div className="lg:px-20 md:px-10 px-4 pt-12 min-h-1/2">
      <Modal
        isOpen={isShowing}
        isHasAccept={false}
        isHasDecline={false}
        title={title}
        bodyMessage={bodyMessage}
        callBackFunction={handleCallBack}
      />
      <div className="lg:text-2xl text-xl">
        <ShoppingCartIcon className="h-6 w-6 inline-flex" /> ตะกร้าสินค้า
      </div>
      <div className="grid grid-cols-12 gap-2 text-center mt-6">
        <div className="lg:col-span-1 col-span-1 lg:text-base text-sm">รายการ</div>
        <div className="lg:col-span-8 col-span-6 lg:text-base text-sm">ชื่อสินค้า</div>
        <div className="lg:col-span-1 col-span-2 lg:text-base text-sm">จำนวนที่ซื้อ</div>
        <div className="lg:col-span-1 col-span-2 text-right lg:text-base text-sm">ราคา</div>
        <div className="lg:col-span-1 col-span-1"></div>
      </div>
      {items?.map((item: IItem, index: number) => (
        <div key={item._id} className="grid grid-cols-12 gap-2 my-1">
          <div className="lg:col-span-1 col-span-1 lg:text-base text-sm text-center">
            {index + 1}
          </div>
          <div className="lg:col-span-8 col-span-6 lg:text-base text-sm">
            {item.product.brand}| {item.product.name}
            {item.product.promotion && (
              <div className="text-xs m-1 bg-gold-300 rounded-full p-1 text-center w-full">
                {item.product.promotion?.type === 'Giveaway' && (
                  <p>
                    {item.product.promotion?.type}| สินค้านี้มีโปรโมชั่นเมื่อซื้อครบ{' '}
                    {item.product.promotion?.condition} ชิ้น แถมอีก {item.product.promotion?.amount}{' '}
                    ชิ้นฟรี
                  </p>
                )}
                {item.product.promotion?.type === 'SaleFlat' && (
                  <p>
                    {item.product.promotion?.type}| สินค้านี้มีโปรโมชั่นเมื่อซื้อครบ{' '}
                    {item.product.promotion?.condition} บาท จะได้รับส่วนลด{' '}
                    {item.product.promotion?.discount} บาท
                  </p>
                )}
                {item.product.promotion?.type === 'SalePercent' && (
                  <p>
                    {item.product.promotion?.type}| สินค้านี้มีโปรโมชั่นเมื่อซื้อครบ{' '}
                    {item.product.promotion?.condition} บาท จะได้รับส่วนลด{' '}
                    {item.product.promotion?.discount} %
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="lg:col-span-1 col-span-2 lg:col-span-1 col-span-2 lg:text-base text-sm text-center">
            {item.amount}
          </div>
          <div className="lg:col-span-1 col-span-2 lg:text-base text-sm text-right">
            {item.amount * item.product.price}
          </div>
          <div className="lg:col-span-1 col-span-1 lg:text-base text-sm grid grid-cols-2 gap-2">
            <button
              onClick={(e) => handleAddItemInCart(e, item.product._id)}
              className="flex justify-center items-start bg-dark-100 text-white-100 hover:bg-dark-300 h-6 w-full rounded-full"
            >
              <PlusIcon className="h-6 w-4" />
            </button>
            <button
              onClick={(e) => handleRemoveItemInCart(e, item.product._id)}
              className="flex justify-center items-start bg-dark-100 text-white-100 hover:bg-dark-300 h-6 w-full rounded-full"
            >
              <MinusIcon className="h-6 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartTable;
