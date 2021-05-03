import { useMutation } from '@apollo/client';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { REMOVE_PROMOTION_BY_ID_MUTATION } from '../../../../graphql/removePromotionMutation';
import useModal from '../../../../hooks/useModalv2';
import { PromotionType } from '../../../commons/type/IPromotion';
import moment from 'moment';
interface AdminPromotionBoxProps {
  item?: PromotionType;
}

const AdminPromotionBox: FC<AdminPromotionBoxProps> = ({ item }: AdminPromotionBoxProps) => {
  const { toggle, ModalElement } = useModal({
    isHasAccept: true,
    isHasDecline: true,
    title: `ต้องการลบหรือไม่?`,
    bodyMessage: `คุณต้องการลบโปรโมชั่น ${item?.name} ชิ้นนี้ ใช่หรือไม่ (หากลบไปแล้วจะไม่สามารถกู้คืนโปรโมชั่นกลับมาได้อีก)`,
    callBackFunction: (status: boolean) => {
      if (status === true && item) {
        removePromotion({
          variables: {
            _id: item._id,
          },
        });
      }
    },
  });
  const [removePromotion] = useMutation(REMOVE_PROMOTION_BY_ID_MUTATION);

  const renderCondition = (promotion: PromotionType) => {
    switch (promotion.type) {
      case 'Giveaway':
        return (
          <h3>
            ซื้อครบ {promotion.condition} แถม {promotion.amount}
          </h3>
        );
      case 'SaleFlat':
        return (
          <h3>
            ลด {promotion.discount} บาท{' '}
            {promotion.condition ? `เมื่อซื้อครบ ${promotion.condition} บาท` : ''}
          </h3>
        );
      case 'SalePercent':
        return (
          <h3>
            ลด {promotion.discount}%{' '}
            {promotion.condition ? `เมื่อซื้อครบ ${promotion.condition} บาท` : ''}
          </h3>
        );
    }
  };

  const renderDate = (promotion: PromotionType) => {
    const startDateLabel = moment(promotion.startDate).format('LLL');
    const endDateLabel = moment(promotion.endDate).format('LLL');
    return (
      <p>
        {startDateLabel} ถึง
        <br />
        {endDateLabel}
      </p>
    );
  };

  if (item) {
    return (
      <div className="hover:bg-white-100">
        <ModalElement />
        <div className="flex flex-col h-full justify-items-stretch">
          <img src={item?.image} className="w-full object-cover bg-center" alt={item?.name} />
          <div className="p-4 h-full flex flex-col items-stretch">
            <h5 className="text-md font-bold mb-2 uppercase">{item?.name}</h5>
            <div className="text-left">{renderDate(item)}</div>
            {/* <p dangerouslySetInnerHTML={{ __html: item?.description ?? '' }} /> */}

            <div className="mt-auto">
              <div className="text-left font-bold my-2">{renderCondition(item)}</div>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  to={`/admin/promotion/${item._id}`}
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

export default AdminPromotionBox;
