import React, { FC, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_ITEM_IN_CART_MUTATION } from '../../commons/graphql/addItemInCartMutation';
import { PRODUCT_BY_SLUG_QUERY } from '../graphql/productBySlugQuery';

const ContentWithSidebarLayout = React.lazy(
  () => import('../../commons/layouts/ContentWithSidebarLayout')
);
const Loading = React.lazy(() => import('../../commons/loading/Loading'));
const NavigationBar = React.lazy(() => import('../../commons/NavigationBar'));
const PromotionAvailableCard = React.lazy(() => import('../../commons/PromotionAvailableCard'));

interface RouteParams {
  slug: string;
}

const ProductDetailPage: FC = () => {
  const { slug } = useParams<RouteParams>();

  const [addItemInCart] = useMutation(ADD_ITEM_IN_CART_MUTATION);
  const handleAddItemInCart = useCallback(
    async (e, id) => {
      e.preventDefault();
      await addItemInCart({
        variables: {
          productId: id,
        },
      });
    },
    [addItemInCart]
  );

  const { loading, error, data } = useQuery(PRODUCT_BY_SLUG_QUERY, { variables: { slug: slug } });
  if (loading) {
    return <Loading />;
  }
  if (error) {
    alert('error');
  }
  const { productBySlug } = data;

  return (
    <ContentWithSidebarLayout>
      <NavigationBar listOfNode={['HOME', '>>', 'PRODUCTS', '>>', productBySlug.name]} />
      <div className="grid grid-cols-2 p-20">
        <div className="flex justify-center items-center">
          <img
            src={productBySlug.image}
            className="w-2/3 object-cover bg-center"
            alt={productBySlug.name}
          />
        </div>

        <div className="flex flex-col justify-around">
          <div>
            <div>
              <p className="text-3xl">{productBySlug.name}</p>
              <p className="text-lg px-1">{productBySlug.brand}</p>
            </div>

            <div className="mx-1 mt-4">
              <p className="text-lg">รายระเอียดสินค้า</p>
              <div className="mt-1 mb-3 border-b-2"></div>
              {productBySlug?.description && <p className="text-sm">{productBySlug.description}</p>}
              {productBySlug?.description === null && (
                <p className="text-sm">ไม่พบรายระเอียดของสินค้า</p>
              )}
            </div>

            {productBySlug.promotion && (
              <PromotionAvailableCard promotion={productBySlug.promotion} />
            )}
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <p className="text-md text-right bg-gold-300 font-bold py-2 px-4 rounded">
              ราคา: {productBySlug.price}
            </p>
            {productBySlug.stock > 0 && (
              <button
                onClick={(e) => handleAddItemInCart(e, productBySlug._id)}
                className="px-4 py-2 bg-dark-400 hover:bg-dark-500 font-bold rounded"
              >
                เพิ่มไปยังตะกร้าสินค้า
              </button>
            )}
            {productBySlug.stock <= 0 && (
              <div className="px-4 py-2 bg-dark-400 hover:bg-dark-500 font-bold rounded">
                สินค้าหมด
              </div>
            )}
          </div>
        </div>
      </div>
    </ContentWithSidebarLayout>
  );
};

export default ProductDetailPage;
