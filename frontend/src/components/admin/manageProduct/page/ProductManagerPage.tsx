import { FC } from 'react';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import CreateProductPage from './CreateProductPage';
import EditProductPage from './EditProductPage';
import ViewAllProductPage from './ViewAllProductPage';
import ViewProductPage from './ViewProductPage';

const ProductManagerPage: FC = () => {
  let { path, url } = useRouteMatch();

  return (
    <>
      <h1 className="font-medium text-3xl">Manage Products</h1>
      <div className="flex my-3 gap-5">
        <Link to={`${url}`}>
          <button className="py-2 px-4 bg-blue-200 text-white font-semibold rounded-lg shadow-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-opacity-75">
            View Products
          </button>
        </Link>
        <Link to={`${url}/create`}>
          <button className="py-2 px-4 bg-blue-200 text-white font-semibold rounded-lg shadow-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-opacity-75">
            Create Product
          </button>
        </Link>
      </div>

      <hr className="my-5" />

      <div className="w-100">
        <Switch>
          <Route exact path={`${path}/create`} component={CreateProductPage} />
          <Route exact path={`${path}`} component={ViewAllProductPage} />
          <Route path={`${path}/:productId`} component={EditProductPage} />
          {/* <Route path={`${path}/:slug`} component={ViewProductPage} /> */}
        </Switch>
      </div>
    </>
  );
};

export default ProductManagerPage;
