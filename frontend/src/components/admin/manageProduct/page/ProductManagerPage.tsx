import { FC } from 'react';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import CreateProductPage from './CreateProductPage';
import EditProductPage from './EditProductPage';
import ViewAllProductPage from './ViewAllProductPage';

const ProductManagerPage: FC = () => {
  let { path, url } = useRouteMatch();

  return (
    <>
      <div className="bg-dark-100 text-white p-4 rounded-xl">
        <h1 className="lg:text-3xl text-2xl font-medium">หน้าจัดการสินค้า</h1>
        <div className="flex my-3 gap-5">
          <Link to={`${url}`}>
            <button className="lg:text-base text-sm py-2 px-4 bg-gold-100 text-dark-100 font-semibold rounded-lg shadow-md hover:bg-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-100 focus:ring-opacity-75">
              ดูสินค้าทั้งหมด
            </button>
          </Link>
          <Link to={`${url}/create`}>
            <button className="lg:text-base text-sm py-2 px-4 bg-gold-100 text-dark-100 font-semibold rounded-lg shadow-md hover:bg-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-100 focus:ring-opacity-75">
              เพิ่มสินค้าใหม่
            </button>
          </Link>
        </div>
      </div>
      <div className="w-100">
        <Switch>
          <Route exact path={`${path}/create`} component={CreateProductPage} />
          <Route exact path={`${path}`} component={ViewAllProductPage} />
          <Route path={`${path}/:productId`} component={EditProductPage} />
        </Switch>
      </div>
    </>
  );
};

export default ProductManagerPage;
