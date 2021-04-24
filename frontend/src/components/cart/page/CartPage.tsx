import React, { FC } from "react";
import ContentWithSidebarLayout from "../../commons/layouts/ContentWithSidebarLayout";
import cart from "../../commons/__mock__/cart";

const CartTable = React.lazy(() => import("../components/CartTable"));
const SummaryWrapper = React.lazy(() => import("../components/SummaryWrapper"));

const CartPage: FC = () => {
  return (
    <ContentWithSidebarLayout>
      <CartTable items={cart.items} />
      <SummaryWrapper
        totalPrice={cart.totalPrice}
        promotionDiscount={cart.promotionDiscount}
        totalFinalPrice={cart.totalFinalPrice}
      />
      <div className="flex px-20 pt-10 justify-end">
        <button className="bg-gold-200 hover:bg-gold-400 px-4 py-2 rounded">Payment</button>
      </div>
    </ContentWithSidebarLayout>
  );
};

export default CartPage;
