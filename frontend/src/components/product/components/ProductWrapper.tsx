import { FC, lazy } from 'react';

import { IProduct } from '../../commons/type/IProduct';

interface ProductProps {
  product: IProduct[];
}

const ProductCard = lazy(() => import('../../commons/ProductCard'));

const ProductWrapper: FC<ProductProps> = ({ product }: ProductProps) => {
  return (
    <div>
      <p className="text-lg">
        ค้นพบน้ำหอมทั้งหมด <span className="font-semibold">{product.length}</span> รายการ
      </p>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-4">
        {product?.map((item: IProduct) => (
          <ProductCard product={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default ProductWrapper;
