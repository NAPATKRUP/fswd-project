import { useQuery } from '@apollo/client';
import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../../commons/loading/Loading';
import { IProduct } from '../../../commons/type/IProduct';
import { PRODUCT_QUERY_BY_SLUG } from '../graphql/queryProduct';

const ViewProductPage: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [productDetail, setProductDetail] = useState<IProduct>();
  const { loading, error, data } = useQuery<{ productFindOne: IProduct }, { slug: string }>(
    PRODUCT_QUERY_BY_SLUG,
    {
      variables: {
        slug: slug,
      },
    }
  );

  useEffect(() => {
    if (data) {
      const { productFindOne } = data;
      setProductDetail(productFindOne);
    }
  }, [data]);

  if (loading) return <Loading />;
  if (error) return <h1>Error have been occur, Please contact developers</h1>;
  if (!productDetail) return <h1>Sorry, Product that you are looking is not found</h1>;

  return (
    <div>
      <h2 className="text-2xl">View Product: {slug}</h2>
      <div>
        <div className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 hover:bg-gray-100">
          <div>
            <img
              src={productDetail?.image}
              className="w-full object-cover bg-center"
              alt={productDetail?.name}
            />
            <div className="p-4">
              <h5 className="text-md font-bold mb-2 uppercase">{productDetail?.brand}</h5>
              <p>{productDetail?.name}</p>
              <p className="mt-4 text-right -bottom-0">{productDetail?.price} บาท</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductPage;
