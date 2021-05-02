import { FC, lazy, useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ICreateProduct, IProduct } from '../../../commons/type/IProduct';
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT_MUTATION } from '../../../../graphql/createProductMutation';
import useModal from '../../../../hooks/useModalv2';
import { useHistory } from 'react-router-dom';

import { CollectionIcon } from '@heroicons/react/outline';
import uploadImage from '../../../../api/uploadImage';

const Navigator = lazy(() => import('../../../commons/Navigator'));

const CreateProductPage: FC = () => {
  const [productDetail, setProductDetail] = useState<ICreateProduct>({
    name: '',
    brand: '',
    price: 0,
    description: '',
  });
  const [imageFile, setImageFile] = useState<File>();
  const [createProduct, { error }] = useMutation<{ createProduct: IProduct }, ICreateProduct>(
    CREATE_PRODUCT_MUTATION
  );
  const { updateModalAndToggle, ModalElement } = useModal({});
  const history = useHistory();

  useEffect(() => {
    console.log(error);
  }, [error]);

  const onUpdateProductDetail = (detail: ICreateProduct) => {
    setProductDetail({
      ...productDetail,
      ...detail,
    });
  };

  const handleProductNameChange = (event) => {
    const name = event.target.value;
    const slug = stringToSlug(name);
    onUpdateProductDetail({ name, slug });
  };

  const handleProductBrandChange = (event) => {
    const brand = event.target.value;
    onUpdateProductDetail({ brand });
  };

  const handleProductPriceChange = (event) => {
    const price: number = parseInt(event.target.value);
    onUpdateProductDetail({ price });
  };

  const handleProductImageChange = (event) => {
    const image: File = event.target.files[0];
    setImageFile(image);
  };

  const handleProductDescriptionChange = (event, editor: any) => {
    const description = editor.getData();
    onUpdateProductDetail({ description });
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

    if (productDetail && productDetail.name && productDetail.brand && productDetail.price) {
      updateModalAndToggle({
        isHasAccept: true,
        isHasDecline: true,
        title: 'สร้างข้อมูลสินค้า',
        bodyMessage: 'คุณยืนยันการสร้างข้อมูลสินค้าหรือไม่',
        callBackFunction: async (status: boolean) => {
          if (status) {
            if (imageFile) {
              await uploadImage(imageFile)
                .then((result) => {
                  const { location } = result.data;
                  sendCreateData({ ...productDetail, image: location });
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
              sendCreateData(productDetail);
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

  const sendCreateData: (product: ICreateProduct) => void = (product: ICreateProduct) => {
    if (product) {
      createProduct({
        variables: {
          ...product,
        },
      });

      setTimeout(() => {
        updateModalAndToggle({
          isHasAccept: true,
          isHasDecline: false,
          title: 'สร้างสินค้าสำเร็จ',
          bodyMessage: 'การสร้างสินค้านี้เสร็จสิ้น',
          callBackFunction: (status: boolean) => {
            history.goBack();
          },
        });
      }, 1000);
    }
  };

  return (
    <div className="mt-8">
      <ModalElement />
      <Navigator listOfNode={['จัดการ', '>>', 'จัดการสินค้า', '>>', 'สร้างสินค้าใหม่']} />
      <div className="lg:px-20 md:px-10 py-10">
        <h2 className="text-2xl mb-4">
          <CollectionIcon className="h-6 w-6 inline-flex" /> สร้างสินค้าใหม่
        </h2>
        <form onSubmit={handleSubmitForm}>
          <div className="grid grid-cols-6 gap-6 my-3">
            <div className="col-span-6 md:col-span-3">
              <img
                src={imageFile ? URL.createObjectURL(imageFile) : 'https://via.placeholder.com/240'}
                className="w-full"
                alt="Product"
              />
            </div>
            <div className="col-span-6 md:col-span-3">
              <div className="my-2">
                <label htmlFor="product_name" className="block text-md font-medium text-dark-200">
                  ชื่อสินค้า *
                </label>
                <input
                  type="text"
                  name="product_name"
                  id="product_name"
                  required
                  onChange={handleProductNameChange}
                  className="form-input rounded-md mt-1 px-2 py-2 w-full lg:w-3/4 shadow-sm sm:text-sm"
                />
              </div>
              <div className="my-2">
                <label htmlFor="product_slug" className="block text-md font-medium text-dark-200">
                  ชื่อ Slug สินค้า *
                </label>
                <input
                  type="text"
                  name="product_slug"
                  id="product_slug"
                  value={productDetail.slug}
                  disabled
                  className="form-input rounded-md mt-1 px-2 py-2 w-full lg:w-3/4 shadow-sm sm:text-sm border-dark-400"
                />
              </div>
              <div className="my-2">
                <label htmlFor="product_brand" className="block text-md font-medium text-dark-200">
                  แบรนด์สินค้า *
                </label>
                <input
                  type="text"
                  name="product_brand"
                  id="product_brand"
                  required
                  onChange={handleProductBrandChange}
                  className="form-input rounded-md mt-1 px-2 py-2 w-full lg:w-3/4 shadow-sm sm:text-sm"
                />
              </div>
              <div className="my-2">
                <label htmlFor="product_price" className="block text-md font-medium text-dark-200">
                  ราคาสินค้า *
                </label>
                <input
                  type="number"
                  name="product_price"
                  id="product_price"
                  min={0}
                  required
                  onChange={handleProductPriceChange}
                  className="form-input rounded-md mt-1 px-2 py-2 w-full lg:w-3/4 shadow-sm sm:text-sm"
                />
              </div>
              <div className="my-2">
                <label htmlFor="product_image" className="block text-md font-medium text-dark-200">
                  รูปสินค้า
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="product_image"
                  id="product_image"
                  onChange={handleProductImageChange}
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="product_description"
                  className="block text-md font-medium text-dark-200"
                >
                  รายละเอียดสินค้า
                </label>
                <CKEditor
                  editor={ClassicEditor}
                  id="product_description"
                  data=""
                  onChange={handleProductDescriptionChange}
                />
              </div>
              <div className="my-4">
                <input
                  type="submit"
                  className="py-2 px-4 bg-gold-100 text-dark-100 font-semibold rounded-lg shadow-md hover:bg-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-100 focus:ring-opacity-75"
                  value="ยืนยันการสร้างสินค้าใหม่"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductPage;
