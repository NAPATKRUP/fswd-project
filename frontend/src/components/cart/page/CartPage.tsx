import React, { FC, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { WAITING_CART_QUERY } from '../graphql/waitingCartQuery';
import { CHECKOUT_MUTATION } from '../graphql/checkoutCartMutation';

const ContentWithSidebarLayout = React.lazy(
  () => import('../../commons/layouts/ContentWithSidebarLayout')
);
const Loading = React.lazy(() => import('../../commons/loading/Loading'));
const CartTable = React.lazy(() => import('../components/CartTable'));
const SummaryWrapper = React.lazy(() => import('../components/SummaryWrapper'));

const CartPage: FC = () => {
  const [checkoutCart] = useMutation(CHECKOUT_MUTATION);
  const handleCheckoutCart = useCallback(
    async (e) => {
      e.preventDefault();
      await checkoutCart({ refetchQueries: [{ query: WAITING_CART_QUERY }] });
    },
    [checkoutCart]
  );

  const { loading, error, data } = useQuery(WAITING_CART_QUERY);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    alert('error');
  }
  const { waitingCart } = data;

  return (
    <ContentWithSidebarLayout>
      <CartTable items={waitingCart.items} />
      <SummaryWrapper
        totalPrice={waitingCart.totalPrice}
        promotionDiscount={waitingCart.promotionDiscount}
        totalFinalPrice={waitingCart.totalFinalPrice}
      />
      <div className="flex px-20 pt-10 justify-end">
        <button
          onClick={(e) => handleCheckoutCart(e)}
          className="bg-gold-200 hover:bg-gold-400 px-4 py-2 rounded"
        >
          CHECKOUT
        </button>
      </div>
    </ContentWithSidebarLayout>
  );
};

export default CartPage;
