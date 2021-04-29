import { FC, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import AdminProductBox from '../components/AdminProductBox';
import Loading from '../../../commons/loading/Loading';
import { IProduct } from '../../../commons/type/IProduct';
import { PRODUCT_QUERY_ALL } from '../graphql/queryProduct';

const ViewAllProductPage: FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { loading, error, data } = useQuery(PRODUCT_QUERY_ALL, {
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

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <div>{error}</div>;
  }

  const renderProductItems: () => JSX.Element[] = () => {
    return products.map((item) => {
      return <AdminProductBox item={item} key={item._id} />;
    });
  };

  return (
    <div className="w-100">
      <h2 className="text-2xl">All Products</h2>
      <div className="flex flex-wrap">{renderProductItems()}</div>
    </div>
  );
};

export default ViewAllProductPage;
