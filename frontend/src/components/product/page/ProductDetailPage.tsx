import { FC, lazy, useState, useCallback } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_ITEM_IN_CART_MUTATION } from '../../../graphql/addItemInCartMutation';
import { PRODUCT_BY_SLUG_QUERY } from '../../../graphql/productBySlugQuery';
import { WAITING_CART_QUERY } from '../../../graphql/waitingCartQuery';

import useModal from '../../../hooks/useModal';

const ContentWithSidebarLayout = lazy(
  () => import('../../commons/layouts/ContentWithSidebarLayout')
);
const Loading = lazy(() => import('../../commons/loading/Loading'));
const Navigator = lazy(() => import('../../commons/Navigator'));
const PromotionAvailableCard = lazy(() => import('../../commons/PromotionAvailableCard'));
const Modal = lazy(() => import('../../commons/Modal'));

interface RouteParams {
  slug: string;
}

const ProductDetailPage: FC = () => {
  const { slug } = useParams<RouteParams>();

  const [title, setTitle] = useState('');
  const [bodyMessage, setBodyMessage] = useState('');
  const { isShowing, toggle } = useModal(false);

  const history = useHistory();

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
          'ระบบได้ทำการเพิ่มจำนวนรายการสินค้าที่ท่านเลือกในตะกร้าสินค้าแล้ว สามารถตรวงสอบได้ที่ตะกร้าสินค้า'
        );
      } catch ({ message }) {
        return handleStatusMessage('ทำรายการไม่สำเร็จ', message);
      }
    },
    [addItemInCart, handleStatusMessage]
  );

  const { loading, error, data } = useQuery(PRODUCT_BY_SLUG_QUERY, { variables: { slug: slug } });
  if (loading) {
    return <Loading />;
  }
  if (error) {
    history.push({ pathname: '/error' });
    return <></>;
  }
  const { productBySlug } = data;

  return (
    <ContentWithSidebarLayout>
      <Modal
        isOpen={isShowing}
        isHasAccept={false}
        isHasDecline={false}
        title={title}
        bodyMessage={bodyMessage}
        callBackFunction={handleCallBack}
      />
      <Navigator listOfNode={['หน้าหลัก', '>>', 'สินค้า', '>>', productBySlug.name]} />
      <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:px-20 md:px-10 py-10">
        <div className="flex justify-center items-center">
          <img
            src={productBySlug.image}
            className="lg:w-2/3 md:w-11/12 sm:w-3/5 object-cover bg-center"
            alt={productBySlug.name}
          />
        </div>

        <div className="flex flex-col justify-around">
          <div>
            <div>
              <p className="lg:text-3xl text-2xl">{productBySlug.name}</p>
              <p className="lg:text-lg px-1">{productBySlug.brand}</p>
            </div>

            <div className="mx-1 mt-4">
              <p className="lg:text-lg">รายละเอียดสินค้า</p>
              <div className="mt-1 mb-3 border-b-2"></div>
              {productBySlug?.description && (
                <p
                  className="text-sm"
                  dangerouslySetInnerHTML={{ __html: productBySlug.description }}
                ></p>
              )}
              {productBySlug?.description === null && (
                <p className="text-sm">ไม่พบรายละเอียดของสินค้า</p>
              )}
            </div>

            {productBySlug.promotion && (
              <PromotionAvailableCard promotion={productBySlug.promotion} />
            )}
          </div>
          <div className="flex justify-end lg:gap-4 md-gap-3 gap-2 mt-4">
            <p className="text-sm font-semibold px-4 py-2 rounded">
              ราคา {productBySlug.price} บาท
            </p>
            {productBySlug.stock > 0 && (
              <button
                onClick={(e) => handleAddItemInCart(e, productBySlug._id)}
                className="text-sm font-semibold bg-dark-500 hover:bg-dark-100 hover:text-white-100 px-4 py-2 rounded"
              >
                เพิ่มไปยังตะกร้าสินค้า
              </button>
            )}
            {productBySlug.stock <= 0 && (
              <div className="bg-dark-400 hover:bg-dark-100 px-4 py-2 rounded">
                <p className="text-sm font-semibold">สินค้าหมด</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ContentWithSidebarLayout>
  );
};

export default ProductDetailPage;
