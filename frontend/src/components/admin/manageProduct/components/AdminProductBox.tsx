import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IProduct } from '../../../commons/type/IProduct';

interface AdminProductBoxProps {
  item?: IProduct;
}

const AdminProductBox: FC<AdminProductBoxProps> = ({ item }: AdminProductBoxProps) => {
  if (item) {
    return (
      <div className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 hover:bg-gray-100">
        <div>
          <img src={item?.image} className="w-full object-cover bg-center" alt={item?.name} />
          <div className="p-4">
            <h5 className="text-md font-bold mb-2 uppercase">{item?.brand}</h5>
            <p>{item?.name}</p>
            <p className="mt-4 text-right -bottom-0">{item?.price} บาท</p>

            <div className="flex justify-start gap-3">
              {/* <Link to={`/admin/product/${item._id}`}>
                <span className="text-blue-100 block">View</span>
              </Link> */}
              <Link to={`/admin/product/${item._id}`}>
                <span className="text-blue-100 hover:text-underline block">Edit</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};

export default AdminProductBox;
