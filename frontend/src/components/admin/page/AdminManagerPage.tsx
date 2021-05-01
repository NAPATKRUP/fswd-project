import { FC } from 'react';
import { Switch, Route, Link, useRouteMatch, useLocation, Redirect } from 'react-router-dom';
import { useSession } from '../../../context/SessionContext';
import ContentWithSidebarLayout from '../../commons/layouts/ContentWithSidebarLayout';
import ProductManagerPage from '../manageProduct/page/ProductManagerPage';
import AdminDashboardPage from './AdminDashboardPage';

const AdminManagerPage: FC = () => {
  const { user } = useSession();
  const { path } = useRouteMatch();
  const location = useLocation();

  const renderLocationHistory = () => {
    const splitPath = location.pathname.split('/');

    return splitPath.slice(1).map((path, index) => {
      const toPath = splitPath.reduce((prev, current, currentIndex) => {
        if (currentIndex - 1 <= index) {
          return prev + '/' + current;
        } else {
          return prev;
        }
      });

      return (
        <div className="inline-block mr-1" key={toPath}>
          <Link to={`${toPath}`}>{`${path}`}</Link>
          {index !== splitPath.slice(1).length - 1 ? <span>{` >>`}</span> : <></>}
        </div>
      );
    });
  };

  return user?.role === 'admin' ? (
    <ContentWithSidebarLayout>
      <div className="flex">{renderLocationHistory()}</div>

      <Switch>
        <Route path={`${path}/product`}>
          <ProductManagerPage />
        </Route>
        <Route exact path={path}>
          <AdminDashboardPage />
        </Route>
      </Switch>
    </ContentWithSidebarLayout>
  ) : (
    <Redirect
      to={{
        pathname: '/no-permission',
        state: { from: location.pathname },
      }}
    />
  );
};

export default AdminManagerPage;
