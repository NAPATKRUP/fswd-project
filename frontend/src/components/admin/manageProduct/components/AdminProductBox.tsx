import { useMutation } from '@apollo/client';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import useModal from '../../../../hooks/useModal';
import Modal from '../../../commons/Modal';
import { IProduct } from '../../../commons/type/IProduct';
import { PRODUCT_REMOVE_BY_ID_MUTATION } from '../graphql/removeProduct';

interface AdminProductBoxProps {
  item?: IProduct;
}

const AdminProductBox: FC<AdminProductBoxProps> = ({ item }: AdminProductBoxProps) => {
  const { isShowing, toggle } = useModal(false);
  const [removeProduct] = useMutation(PRODUCT_REMOVE_BY_ID_MUTATION);

  const handleCallBack = (status: boolean) => {
    if (status === true && item) {
      toggle();
      removeProduct({
        variables: {
          _id: item._id,
        },
      });
    }
  };

  if (item) {
    return (
      <div className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 hover:bg-gray-100">
        <Modal
          isOpen={isShowing}
          isHasAccept={true}
          isHasDecline={true}
          title={`ต้องการลบหรือไม่?`}
          bodyMessage={`คุณต้องการลบสินค้า ${item?.name} ชิ้นนี้ ใช่หรือไม่ (หากลบไปแล้วจะไม่สามารถกู้คืนสินค้ากลับมาได้อีก)`}
          callBackFunction={handleCallBack}
        />
        <div>
          <img src={item?.image} className="w-full object-cover bg-center" alt={item?.name} />
          <div className="p-4">
            <h5 className="text-md font-bold mb-2 uppercase">{item?.brand}</h5>
            <p>{item?.name}</p>
            <p className="mt-4 text-right -bottom-0">{item?.price} บาท</p>

            <div className="flex justify-between mt-3 gap-3">
              <Link to={`/admin/product/${item._id}`}>
                <button className="text-blue-100 border-blue-100 hover:bg-blue-300 hover:border-blue-200 hover:text-blue-500 focus:border-blue-300 px-3 py-2">
                  <span>Edit</span>
                </button>
              </Link>
              <button
                onClick={() => toggle()}
                className="text-red-500 border-red-500 hover:bg-red-100 hover:border-red-200 focus:border-red-300 px-3 py-2"
              >
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};

export default AdminProductBox;
