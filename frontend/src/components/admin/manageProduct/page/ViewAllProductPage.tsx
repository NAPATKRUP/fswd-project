import { FC, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import AdminProductBox from '../components/AdminProductBox';
import Loading from '../../../commons/loading/Loading';
import { PRODUCT_ALL_QUERY } from '../../../../graphql/productAllQuery';
import { IProduct } from '../../../commons/type/IProduct';

const ViewAllProductPage: FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const { loading, error, data } = useQuery(PRODUCT_ALL_QUERY, {
    variables: {
      limit: 100,
    },
  });

  useEffect(() => {
    if (data) {
      const { productByMany } = data;
      setProducts(productByMany);
    }
  }, [data]);

  const renderProductItems: () => JSX.Element[] = () => {
    return products.map((item) => <AdminProductBox item={item} key={item._id} />);
  };

  const renderContent = () => {
    if (loading) {
      return <Loading isFullscreen={false} />;
    } else if (error) {
      return <div>{error}</div>;
    }

    return (
      <>
        <h2 className="text-2xl">สินค้าทั้งหมด</h2>
        <div className="flex flex-wrap items-stretch">{renderProductItems()}</div>
      </>
    );
  };

  return <div className="w-100">{renderContent()}</div>;
};

export default ViewAllProductPage;
