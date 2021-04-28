import React, { FC, useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_ITEM_IN_CART_MUTATION } from '../commons/graphql/addItemInCartMutation';

import useModal from '../../hooks/useModal';

import { IProduct } from './type/IProduct';

interface ProductBoxProps {
  product: IProduct;
}

const Modal = React.lazy(() => import('../commons/Modal'));

const ProductBox: FC<ProductBoxProps> = ({ product }: ProductBoxProps) => {
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
  const handleCallBack = (stats: boolean) => {
    if (!stats) toggle();
  };

  const [addItemInCart] = useMutation(ADD_ITEM_IN_CART_MUTATION);

  const handleAddItemInCart = useCallback(
    async (e, id) => {
      e.preventDefault();
      try {
        await addItemInCart({
          variables: {
            productId: id,
          },
        });
        return handleStatusMessage(
          'เพิ่มจำนวนสินค้าเสร็จสิ้น',
          'ระบบได้ทำการเพิ่มจำนวนรายการสินค้าที่ท่านเลือกในตะกร้าสินค้าแล้ว'
        );
      } catch (e) {
        return handleStatusMessage('ทำรายการไม่สำเร็จ', e.toString().replace('Error: ', ''));
      }
    },
    [addItemInCart, handleStatusMessage]
  );

  // const handleBuyItemInCart = useCallback(
  //   async (e, id) => {
  //     await handleAddItemInCart(e, id);
  //     // TODO Redirect
  //   },
  //   [handleAddItemInCart]
  // );

  return (
    <div className="p-4 hover:bg-white-200 rounded-2xl">
      <Modal
        isOpen={isShowing}
        isHasAccept={false}
        isHasDecline={false}
        title={title}
        bodyMessage={bodyMessage}
        callBackFunction={handleCallBack}
      />
      <NavLink to={`/product/${product.slug}`}>
        <div className="relative">
          <img src={product?.image} className="w-full object-cover bg-center" alt={product?.slug} />
          <div className="flex flex-col items-around">
            <h5 className="text-md font-bold mb-2 mt-1 uppercase">{product?.brand}</h5>
            <p className="h-20">{product?.name}</p>
            <p className="my-2 text-right -bottom-0">{product?.price} บาท</p>
          </div>
          {product?.stock !== 0 && (
            <div className="flex justify-center mt-2">
              {/* <button
                onClick={(e) => handleBuyItemInCart(e, product._id)}
                className="border-2 border-black hover:bg-dark-500 px-2 py-1 rounded-full font-bold mx-1"
              >
                ซื้อด่วน
              </button> */}
              <button
                onClick={(e) => handleAddItemInCart(e, product._id)}
                className="border-2 border-black hover:bg-dark-500 px-2 py-1 rounded-full font-bold mx-1"
              >
                เพิ่มสินค้า
              </button>
            </div>
          )}
          {product?.stock === 0 && (
            <div className="text-center w-full absolute top-40 right-0 opacity-80 bg-dark-500 py-1 px-4 rounded-full font-bold">
              สินค้าหมด
            </div>
          )}
          {product?.promotion && (
            <div className="text-center text-md absolute top-0 right-0 bg-red-600 text-white-100 py-1 px-4 rounded-full transform rotate-12">
              {product.promotion.name}
            </div>
          )}
        </div>
      </NavLink>
    </div>
  );
};

export default ProductBox;
