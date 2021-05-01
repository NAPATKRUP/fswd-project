import { FC, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/home/page/HomePage';
import LoginPage from './components/login/page/LoginPage';
import RegisterPage from './components/register/page/RegisterPage';
import ProductPage from './components/product/page/ProductPage';
import ProductDetailPage from './components/product/page/ProductDetailPage';
import PromotionPage from './components/promotion/page/PromotionPage';
import CartPage from './components/cart/page/CartPage';
import CheckoutPage from './components/checkout/page/CheckoutPage';
import PaymentPage from './components/payment/page/PaymentPage';
import CusomterPage from './components/customer/page/CustomerPage';
import ErrorPage from './components/error/page/ErrorPage';
import NotFoundPage from './components/error/page/NotFoundPage';
import NotPermissionPage from './components/error/page/NotPermissionPage';
import AdminManagerPage from './components/admin/page/AdminManagerPage';

const App: FC = () => {
  const renderRoute = () => {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/products" component={ProductPage} />
          <Route path="/product/:slug" component={ProductDetailPage} />
          <Route exact path="/promotions" component={PromotionPage} />
          <Route exact path="/cart" component={CartPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/payment" component={PaymentPage} />
          <Route path="/customer" component={CusomterPage} />
          {/* <Route exact path="/cart/:cartId/payment" component={PaymentPage} /> */}
          {/* <Route exact path="/manage-product" component={ManageProduct} /> */}
          {/* <AdminRoute role={user.role} exact path="/manage-product" component={ManageProduct} /> */}
          <Route exact path="/no-permission" component={NotPermissionPage} />
          <Route exact path="/error" component={ErrorPage} />
          <Route path="/admin" component={AdminManagerPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Fragment>
    );
  };

  return renderRoute();
};

export default App;
