import { FC, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './components/login/page/LoginPage';
import RegisterPage from './components/register/page/RegisterPage';
import ProductPage from './components/product/page/ProductPage';
import HomePage from './components/home/page/HomePage';
import PromotionPage from './components/promotion/page/PromotionPage';
import NotPermissionPage from './components/error/page/NotPermissionPage';
import ProductDetailPage from './components/product/page/ProductDetailPage';
import CartPage from './components/cart/page/CartPage';
import CheckoutPage from './components/checkout/page/CheckoutPage';
import PaymentPage from './components/payment/page/PaymentPage';
import NotFoundPage from './components/error/page/NotFoundPage';
import AdminManagerPage from './components/admin/page/AdminManagerPage';
// import { useSession } from "./context/SessionContext";

const App: FC = () => {
  // const { user } = useSession();

  const renderRoute = () => {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route path="/product/:slug" component={ProductDetailPage} />
          <Route exact path="/products" component={ProductPage} />
          <Route exact path="/promotions" component={PromotionPage} />
          <Route exact path="/no-permission" component={NotPermissionPage} />
          <Route exact path="/cart" component={CartPage} />
          <Route exact path="/checkout/:orderId" component={CheckoutPage} />
          <Route exact path="/payment/:orderId" component={PaymentPage} />
          {/* <Route exact path="/cart/:cartId/payment" component={PaymentPage} /> */}
          <Route path="/admin" component={AdminManagerPage} />
          {/* <CustomerRoute role={user.role} exact path="/cart" component={CartPage} /> */}
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </Fragment>
    );
  };

  return renderRoute();
};

//Customer Permission
// interface CustomerRouteProps extends RouteProps {
//   // tslint:disable-next-line:no-any
//   component: any;
//   role: string;
// }

// const CustomerRoute = (props: CustomerRouteProps) => {
//   const { component: Component, role, ...rest } = props;

//   return (
//     <Route
//       {...rest}
//       render={(routeProps) =>
//         role === "customer" ? (
//           <Component {...routeProps} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/",
//               state: { from: routeProps.location },
//             }}
//           />
//         )
//       }
//     />
//   );
// };

export default App;
