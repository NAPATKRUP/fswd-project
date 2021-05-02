import { FC, lazy, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useParams } from 'react-router-dom';
import Loading from '../../../commons/loading/Loading';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import useModal from '../../../../hooks/useModalv2';
import { CollectionIcon } from '@heroicons/react/outline';
import { UpdatePromotionType, PromotionType } from '../../../commons/type/IPromotion';
import { PROMOTION_BY_ID_QUERY } from '../../../../graphql/promotionByIdQuery';
import { UPDATE_GIVEAWAY_PROMOTION_BY_ID_MUTATION } from '../../../../graphql/updateGiveawayPromotionMutation';
import { UPDATE_SALEPERCENT_PROMOTION_BY_ID_MUTATION } from '../../../../graphql/updateSalePercentPromotionMutation';
import { UPDATE_SALEFLAT_PROMOTION_BY_ID_MUTATION } from '../../../../graphql/updateSaleFlatPromotionMutation';
import moment from 'moment';
import uploadImage from '../../../../api/uploadImage';

const Navigator = lazy(() => import('../../../commons/Navigator'));

const EditPromotionPage: FC = () => {
  const { promotionId } = useParams<{ promotionId: string }>();
  const [promotionDetail, setPromotionDetail] = useState<UpdatePromotionType>();
  const [defaultPromotionDetail, setDefaultPromotionDetail] = useState<UpdatePromotionType>();
  const [imageFile, setImageFile] = useState<File>();
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const { updateModalAndToggle, ModalElement } = useModal({});
  const { loading: queryLoading, error: queryError } = useQuery<
    { promotionById: PromotionType },
    { id: string }
  >(PROMOTION_BY_ID_QUERY, {
    variables: {
      id: promotionId,
    },
    onCompleted: (data: { promotionById: PromotionType }) => {
      const { promotionById } = data;
      if (promotionById) {
        setPromotionDetail(promotionById);
        setDefaultPromotionDetail(promotionById);
      }
      setIsFetching(false);
    },
    onError: (error: ApolloError) => {
      console.log(error);
      setIsFetching(false);
    },
  });
  const [updateGiveawayPromotion, { error: giveawayError }] = useMutation<
    { updateGiveawayPromotion: PromotionType },
    UpdatePromotionType
  >(UPDATE_GIVEAWAY_PROMOTION_BY_ID_MUTATION);
  const [updateSaleFlatPromotion, { error: saleFlatError }] = useMutation<
    { updateSaleFlatPromotion: PromotionType },
    UpdatePromotionType
  >(UPDATE_SALEFLAT_PROMOTION_BY_ID_MUTATION);
  const [updateSalePercentPromotion, { error: salePercentError }] = useMutation<
    { updateSalePercentPromotion: PromotionType },
    UpdatePromotionType
  >(UPDATE_SALEPERCENT_PROMOTION_BY_ID_MUTATION);

  const onUpdatePromotionDetail = (detail: UpdatePromotionType) => {
    if (promotionDetail) {
      setPromotionDetail({
        ...promotionDetail,
        ...detail,
      });
    }
  };

  const handlePromotionTypeChange = (event) => {
    const type = event.target.value;
    onUpdatePromotionDetail({ type, discount: undefined, amount: undefined, condition: undefined });
  };

  const handlePromotionNameChange = (event) => {
    const name = event.target.value;
    const slug = stringToSlug(name);
    onUpdatePromotionDetail({ name, slug });
  };

  const handlePromotionDescriptionChange = (event, editor: any) => {
    const description = editor.getData();
    onUpdatePromotionDetail({ description });
  };

  const handlePromotionImageChange = (event) => {
    const image: File = event.target.files[0];
    setImageFile(image);
  };

  const handlePromotionStartDateChange = (event) => {
    const startDate = event.target.value;
    onUpdatePromotionDetail({ startDate });
  };

  const handlePromotionEndDateChange = (event) => {
    const endDate = event.target.value;
    onUpdatePromotionDetail({ endDate });
  };

  const handlePromotionConditionChange = (event) => {
    const condition: number = parseInt(event.target.value);
    onUpdatePromotionDetail({ condition });
  };

  const handlePromotionAmountChange = (event) => {
    const amount: number = parseInt(event.target.value);
    onUpdatePromotionDetail({ amount });
  };

  const handlePromotionDiscountChange = (event) => {
    const discount: number = parseInt(event.target.value);
    onUpdatePromotionDetail({ discount });
  };

  // convert string to slug
  // Reference: https://gist.github.com/silkyland/004e9c74ed9ed8b76d613bc2e4e48f52
  const stringToSlug = (str: string) => {
    return str
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace('%', 'เปอร์เซนต์') // Translate some charactor
      .replace(/[^\u0E00-\u0E7F\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '');
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();

    if (
      promotionDetail &&
      promotionDetail.name &&
      promotionDetail.startDate &&
      promotionDetail.endDate
    ) {
      updateModalAndToggle({
        isHasAccept: true,
        isHasDecline: true,
        title: 'แก้ไขข้อมูลโปรโมชั่น',
        bodyMessage: 'คุณยืนยันการแก้ไขข้อมูลโปรโมชั่นหรือไม่',
        callBackFunction: async (status: boolean) => {
          if (status) {
            if (imageFile) {
              await uploadImage(imageFile)
                .then((result) => {
                  const { location } = result.data;
                  onUpdatePromotionDetail({ image: location });
                  sendUpdatePromotion({ ...promotionDetail, image: location });
                })
                .catch((error) => {
                  setTimeout(() => {
                    updateModalAndToggle({
                      isHasAccept: true,
                      isHasDecline: false,
                      title: 'เกิดข้อผิดพลาด',
                      bodyMessage: `กรุณาลองใหม่อีกครั้ง (${error})`,
                    });
                  }, 1000);
                });
            } else {
              sendUpdatePromotion(promotionDetail);
            }
          }
        },
      });
    } else {
      updateModalAndToggle({
        isHasAccept: true,
        isHasDecline: false,
        title: 'ตรวจสอบข้อมูลอีกครั้ง',
        bodyMessage: 'ดูเหมือนคุณกรอกข้อมูลบางส่วนหายไป! <b>กรุณาตรวจสอบข้อมูลอีกครั้ง</b>',
      });
    }
  };

  const sendUpdatePromotion = (promotion: UpdatePromotionType) => {
    switch (promotion.type) {
      case 'Giveaway':
        updateGiveawayPromotion({
          variables: {
            ...promotion,
          },
        });
        break;
      case 'SaleFlat':
        updateSaleFlatPromotion({
          variables: {
            ...promotion,
          },
        });
        break;
      case 'SalePercent':
        updateSalePercentPromotion({
          variables: {
            ...promotion,
          },
        });
        break;
    }

    setDefaultPromotionDetail(promotion);

    setTimeout(() => {
      updateModalAndToggle({
        isHasAccept: true,
        isHasDecline: false,
        title: 'แก้ไขข้อมูลโปรโมชั่นสำเร็จ',
        bodyMessage: 'การแก้ไขข้อมูลโปรโมชั่นนี้เสร็จสิ้น',
        callBackFunction: (status: boolean) => {},
      });
    }, 1000);
  };

  const resetForm = () => {
    setImageFile(undefined);
    setPromotionDetail(defaultPromotionDetail);
  };

  const renderPromotionDependOnTypeField = (promotion: UpdatePromotionType) => {
    switch (promotion.type) {
      case 'Giveaway':
        return (
          <>
            <div className="my-2">
              <label
                htmlFor="promotion_condition"
                className="block text-md font-medium text-dark-200"
              >
                เงื่อนไขที่ต้องซื้อ (ชิ้น) *
              </label>
              <input
                type="text"
                name="promotion_condition"
                id="promotion_condition"
                value={promotion.condition}
                required
                onChange={handlePromotionConditionChange}
                className="form-input rounded-md mt-1 px-2 py-2 w-full lg:w-3/4 shadow-sm sm:text-sm"
              />
            </div>

            <div className="my-2">
              <label htmlFor="promotion_amount" className="block text-md font-medium text-dark-200">
                จำนวนที่แถม (ชิ้น) *
              </label>
              <input
                type="text"
                name="promotion_amount"
                id="promotion_amount"
                value={promotion.amount}
                required
                onChange={handlePromotionAmountChange}
                className="form-input rounded-md mt-1 px-2 py-2 w-full lg:w-3/4 shadow-sm sm:text-sm"
              />
            </div>
          </>
        );
      case 'SaleFlat':
        return (
          <>
            <div className="my-2">
              <label
                htmlFor="promotion_condition"
                className="block text-md font-medium text-dark-200"
              >
                เงื่อนไขที่ต้องซื้อ (บาท) *
              </label>
              <input
                type="text"
                name="promotion_condition"
                id="promotion_condition"
                value={promotion.condition}
                required
                onChange={handlePromotionConditionChange}
                className="form-input rounded-md mt-1 px-2 py-2 w-full lg:w-3/4 shadow-sm sm:text-sm"
              />
            </div>

            <div className="my-2">
              <label
                htmlFor="promotion_discount"
                className="block text-md font-medium text-dark-200"
              >
                ราคาที่ลด (บาท) *
              </label>
              <input
                type="text"
                name="promotion_discount"
                id="promotion_discount"
                value={promotion.discount}
                required
                onChange={handlePromotionDiscountChange}
                className="form-input rounded-md mt-1 px-2 py-2 w-full lg:w-3/4 shadow-sm sm:text-sm"
              />
            </div>
          </>
        );
      case 'SalePercent':
        return (
          <>
            <div className="my-2">
              <label
                htmlFor="promotion_condition"
                className="block text-md font-medium text-dark-200"
              >
                เงื่อนไขที่ต้องซื้อ (บาท) *
              </label>
              <input
                type="text"
                name="promotion_condition"
                id="promotion_condition"
                value={promotion.condition}
                required
                onChange={handlePromotionConditionChange}
                className="form-input rounded-md mt-1 px-2 py-2 w-full lg:w-3/4 shadow-sm sm:text-sm"
              />
            </div>

            <div className="my-2">
              <label
                htmlFor="promotion_discount"
                className="block text-md font-medium text-dark-200"
              >
                ราคาที่ลด (%) *
              </label>
              <input
                type="text"
                name="promotion_discount"
                id="promotion_discount"
                value={promotion.discount}
                required
                onChange={handlePromotionDiscountChange}
                className="form-input rounded-md mt-1 px-2 py-2 w-full lg:w-3/4 shadow-sm sm:text-sm"
              />
            </div>
          </>
        );
      default:
        return <></>;
    }
  };

  const renderFormContent = () => {
    if (queryLoading || isFetching) return <Loading isFullscreen={false} />;
    else if (queryError) return <h1>เกิดข้อผิดพลาด กรุณาติดต่อกับผู้พัฒนา</h1>;
    else if (!promotionDetail) {
      return <h1>ขออภัย, ดูเหมือนเราจะไม่พบโปรโมชั่นทีคุณต้องการ</h1>;
    }

    return (
      <div className="mt-8">
        <ModalElement />
        <Navigator listOfNode={['จัดการ', '>>', 'จัดการโปรโมชั่น', '>>', 'แก้ไขโปรโมชั่น']} />
        <div className="lg:px-20 md:px-10 py-10">
          <h2 className="text-2xl mb-4">
            <CollectionIcon className="h-6 w-6 inline-flex" /> แก้ไขโปรโมชั่นใหม่
          </h2>
          <form onSubmit={handleSubmitForm}>
            <div className="grid grid-cols-6 gap-6 my-3">
              <div className="col-span-6 md:col-span-3">
                <img
                  src={
                    imageFile
                      ? URL.createObjectURL(imageFile)
                      : promotionDetail.image
                      ? promotionDetail.image
                      : 'https://via.placeholder.com/240'
                  }
                  className="w-full"
                  alt="Promotion"
                />
              </div>
              <div className="col-span-6 md:col-span-3">
                <div className="my-2">
                  <label
                    htmlFor="promotion_type"
                    className="block text-md font-medium text-dark-200"
                  >
                    ประเภทโปรโมชั่น *
                  </label>
                  <div className="inline-block relative w-full lg:w-3/4">
                    <select
                      id="promotion_type"
                      defaultValue={promotionDetail.type}
                      onChange={handlePromotionTypeChange}
                      disabled
                      className="block appearance-none w-full bg-white border border-dark-200 hover:border-dark-300 px-2 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="" disabled>
                        กรุณาเลือกโปรโมชั่น
                      </option>
                      <option value="Giveaway">แถมฟรี</option>
                      <option value="SaleFlat">ลดราคาแบบ Flat</option>
                      <option value="SalePercent">ลดราคาแบบ Percent</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-dark-300">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="my-2">
                  <label
                    htmlFor="promotion_name"
                    className="block text-md font-medium text-dark-200"
                  >
                    ชื่อโปรโมชั่น *
                  </label>
                  <input
                    type="text"
                    name="promotion_name"
                    id="promotion_name"
                    value={promotionDetail.name}
                    required
                    onChange={handlePromotionNameChange}
                    className="form-input rounded-md mt-1 px-2 py-2 w-full lg:w-3/4 shadow-sm sm:text-sm"
                  />
                </div>
                <div className="my-2">
                  <label
                    htmlFor="promotion_slug"
                    className="block text-md font-medium text-dark-200"
                  >
                    ชื่อ Slug โปรโมชั่น *
                  </label>
                  <input
                    type="text"
                    name="promotion_slug"
                    id="promotion_slug"
                    value={promotionDetail.slug}
                    disabled
                    className="form-input rounded-md mt-1 px-2 py-2 w-full lg:w-3/4 shadow-sm sm:text-sm border-dark-400"
                  />
                </div>
                <div className="my-2">
                  <label
                    htmlFor="promotion_startDate"
                    className="block text-md font-medium text-dark-200"
                  >
                    วันที่เริ่มโปรโมชั่น *
                  </label>
                  <input
                    type="datetime-local"
                    name="promotion_startDate"
                    id="promotion_startDate"
                    max={moment(promotionDetail.endDate).format('YYYY-MM-DDTHH:mm')}
                    value={moment(promotionDetail.startDate).format('YYYY-MM-DDTHH:mm')}
                    onChange={handlePromotionStartDateChange}
                    className="form-input rounded-md mt-1 px-2 py-2 w-full lg:w-3/4 shadow-sm sm:text-sm"
                  />
                </div>
                <div className="my-2">
                  <label
                    htmlFor="promotion_endDate"
                    className="block text-md font-medium text-dark-200"
                  >
                    วันที่สิ้นสุดโปรโมชั่น *
                  </label>
                  <input
                    type="datetime-local"
                    name="promotion_endDate"
                    id="promotion_endDate"
                    min={moment(promotionDetail.startDate).format('YYYY-MM-DDTHH:mm')}
                    value={moment(promotionDetail.endDate).format('YYYY-MM-DDTHH:mm')}
                    onChange={handlePromotionEndDateChange}
                    className="form-input rounded-md mt-1 px-2 py-2 w-full lg:w-3/4 shadow-sm sm:text-sm"
                  />
                </div>
                {renderPromotionDependOnTypeField(promotionDetail)}
                <div className="my-2">
                  <label
                    htmlFor="promotion_image"
                    className="block text-md font-medium text-dark-200"
                  >
                    รูปโปรโมชั่น
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name="product_image"
                    id="product_image"
                    onChange={handlePromotionImageChange}
                  />
                </div>
                <div className="my-2">
                  <label
                    htmlFor="promotion_description"
                    className="block text-md font-medium text-dark-200"
                  >
                    รายละเอียดโปรโมชั่น
                  </label>
                  <CKEditor
                    editor={ClassicEditor}
                    id="promotion_description"
                    data={promotionDetail.description}
                    onChange={handlePromotionDescriptionChange}
                  />
                </div>
                <div className="flex flex-wrap gap-3 my-4">
                  <input
                    type="submit"
                    className="py-2 px-4 bg-gold-100 text-dark-100 font-semibold rounded-lg shadow-md hover:bg-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-100 focus:ring-opacity-75 cursor-pointer"
                    value="ยืนยันการแก้ไขข้อมูลโปรโมชั่น"
                  />
                  <input
                    type="reset"
                    onClick={resetForm}
                    className="py-2 px-4 bg-dark-100 text-white-100 font-semibold rounded-lg shadow-md hover:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-dark-100 focus:ring-opacity-75 cursor-pointer"
                    value="คืนค่าเดิมของโปรโมชั่น"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div>
      <ModalElement />
      {renderFormContent()}
    </div>
  );
};

export default EditPromotionPage;
