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

  return (
    <div className="hover:bg-white-200 rounded-2xl">
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
          <div className="relative">
            <img
              src={product?.image}
              className="w-full object-cover bg-center"
              alt={product?.slug}
            />
            {product?.stock === 0 && (
              <div className="flex justify-center items-center font-semibold absolute inset-0 px-4 py-1">
                <div className="bg-dark-400 opacity-90 px-4 py-2 rounded-full">
                  <p>สินค้าหมด</p>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col p-4">
            <p className="font-semibold uppercase mt-1 mb-2">{product?.brand}</p>
            <p className="h-20">{product?.name}</p>
            <p className="text-right mt-2">{product?.price} บาท</p>
          </div>
          {product?.stock !== 0 && (
            <div className="flex justify-center mb-2">
              <button
                onClick={(e) => handleAddItemInCart(e, product._id)}
                className="font-semibold border-2 rounded-full hover:bg-dark-100 hover:text-white-100 mx-1 px-2 py-1"
              >
                เพิ่มสินค้า
              </button>
            </div>
          )}
          {product?.promotion && (
            <div className="bg-red-600 rounded-lg absolute top-0 right-0 px-4 py-1 transform rotate-12">
              <p className="text-center text-white-100">{product.promotion.name}</p>
            </div>
          )}
        </div>
      </NavLink>
    </div>
  );
};

export default ProductBox;
