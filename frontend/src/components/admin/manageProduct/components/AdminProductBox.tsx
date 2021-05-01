import { useMutation } from '@apollo/client';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { IProduct } from '../../../commons/type/IProduct';
import { REMOVE_PRODUCT_BY_ID_MUTATION } from '../../../../graphql/removeProductMutation';
import useModal from '../../../../hooks/useModalv2';

interface AdminProductBoxProps {
  item?: IProduct;
}

const AdminProductBox: FC<AdminProductBoxProps> = ({ item }: AdminProductBoxProps) => {
  const { toggle, ModalElement } = useModal({
    isHasAccept: true,
    isHasDecline: true,
    title: `ต้องการลบหรือไม่?`,
    bodyMessage: `คุณต้องการลบสินค้า ${item?.name} ชิ้นนี้ ใช่หรือไม่ (หากลบไปแล้วจะไม่สามารถกู้คืนสินค้ากลับมาได้อีก)`,
    callBackFunction: (status: boolean) => {
      if (status === true && item) {
        removeProduct({
          variables: {
            _id: item._id,
          },
        });
      }
    },
  });
  const [removeProduct] = useMutation(REMOVE_PRODUCT_BY_ID_MUTATION);

  if (item) {
    return (
      <div className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 hover:bg-gray-100">
        <ModalElement />
        <div className="flex flex-col h-full justify-items-stretch">
          <img src={item?.image} className="w-full object-cover bg-center" alt={item?.name} />
          <div className="p-4 h-full flex flex-col items-stretch">
            <h5 className="text-md font-bold mb-2 uppercase">{item?.brand}</h5>
            <p>{item?.name}</p>

            <div className="mt-auto">
              <p className="text-right my-3">{item?.price} บาท</p>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to={`/admin/product/${item._id}`}
                  className="text-blue-100 border-blue-100 hover:bg-blue-300 hover:border-blue-200 hover:text-blue-500 focus:border-blue-300 px-3 py-2 text-center"
                >
                  <PencilAltIcon className="w-5 h-5 mx-auto" />
                  <span>แก้ไข</span>
                </Link>
                <button
                  onClick={() => toggle()}
                  className="text-red-500 border-red-500 hover:bg-red-100 hover:border-red-200 focus:border-red-300 px-3 py-2 text-center"
                >
                  <TrashIcon className="w-5 h-5 mx-auto" />
                  <span>ลบ</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};

export default AdminProductBox;
