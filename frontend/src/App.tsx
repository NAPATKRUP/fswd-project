import React, { FunctionComponent, Fragment, useContext } from "react";
import { BrowserRouter, Route, Redirect, Switch, RouteProps } from "react-router-dom";
import LoginPage from "./components/login/page/LoginPage";
import ProductPage from "./components/product/page/ProductPage";
import ProductDetailPage from "./components/product/page/ProductDetailPage";
import HomePage from "./components/home/page/HomePage";
import PromotionPage from "./components/promotion/page/PromotionPage";
import ManageProduct from "./components/manageProduct/page/ManageProduct";
import { UserContext } from "./context/UserContext";
import NotPermissionPage from "./components/error/page/NotPermissionPage";
import CartPage from "./components/cart/page/CartPage";

const App: FunctionComponent = () => {
  const user = useContext(UserContext);

  const renderRoute = () => {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/products" component={ProductPage} />
          <Route exact path="/products/detail" component={ProductDetailPage} />
          <Route exact path="/promotion" component={PromotionPage} />
          <Route exact path="/no-permission" component={NotPermissionPage} />
          <AdminRoute role={user.role} exact path="/manage-product" component={ManageProduct} />
          <CustomerRoute role={user.role} exact path="/cart" component={CartPage} />
        </Switch>
      </Fragment>
    );
  };

  return <BrowserRouter>{renderRoute()}</BrowserRouter>;
};

//Admin Permission
interface AdminRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component: any;
  role: string;
}

const AdminRoute = (props: AdminRouteProps) => {
  const { component: Component, role, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        role === "admin" ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/no-permission",
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

//Customer Permission
interface CustomerRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component: any;
  role: string;
}

const CustomerRoute = (props: CustomerRouteProps) => {
  const { component: Component, role, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        role === "customer" ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

export default App;
