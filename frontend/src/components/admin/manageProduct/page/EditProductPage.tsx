import { FC, lazy, useState, useCallback } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useParams } from 'react-router-dom';
import { IProduct, IUpdateProduct } from '../../../commons/type/IProduct';
import Loading from '../../../commons/loading/Loading';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { UPDATE_PRODUCT_BY_ID_MUTATION } from '../../../../graphql/updateProductMutation';
import { PRODUCT_BY_ID_QUERY } from '../../../../graphql/productByIdQuery';
import useModal from '../../../../hooks/useModalv2';
import { CollectionIcon } from '@heroicons/react/outline';
import uploadImage from '../../../../api/uploadImage';

const Navigator = lazy(() => import('../../../commons/Navigator'));

const EditProductPage: FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [productDetail, setProductDetail] = useState<IProduct>();
  const [defaultProductDetail, setDefaultProductDetail] = useState<IProduct>();
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [imageFile, setImageFile] = useState<File>();
  const { updateModalAndToggle, ModalElement } = useModal({});
  const { loading: queryLoading, error: queryError } = useQuery<
    { productById: IProduct },
    { id: string }
  >(PRODUCT_BY_ID_QUERY, {
    variables: {
      id: productId,
    },
    onCompleted: (data: { productById: IProduct }) => {
      const { productById } = data;
      if (productById) {
        setProductDetail(productById);
        setDefaultProductDetail(productById);
      }
      setIsFetching(false);
    },
    onError: (error: ApolloError) => {
      setIsFetching(false);
    },
  });
  const [updateProduct] = useMutation<{ updateProductById: IProduct }, IUpdateProduct>(
    UPDATE_PRODUCT_BY_ID_MUTATION
  );

  const onUpdateProductDetail = useCallback(
    (detail: IUpdateProduct) => {
      const product: any = { ...productDetail, ...detail };
      setProductDetail(product);
    },
    [productDetail]
  );

  const handleProductNameChange = (event) => {
    const name: string = event.target.value;
    const slug: string = stringToSlug(name);
    const product: any = { ...productDetail, name, slug };
    setProductDetail(product);
  };

  const handleProductBrandChange = (event) => {
    const brand: string = event.target.value;
    onUpdateProductDetail({ brand });
  };

  const handleProductPriceChange = (event) => {
    const price: number = parseInt(event.target.value);
    onUpdateProductDetail({ price });
  };

  const handleProductStockChange = (event) => {
    const stock: number = parseInt(event.target.value);
    onUpdateProductDetail({ stock });
  };

  const handleProductImageChange = (event) => {
    const image: File = event.target.files[0];
    setImageFile(image);
  };

  const handleProductDescriptionChange = (event, editor: any) => {
    const description: string = editor.getData();
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
      const { promotion, createAt, updateAt, ...product } = productDetail;

      updateModalAndToggle({
        isHasAccept: true,
        isHasDecline: true,
        title: 'แก้ไขข้อมูลสินค้า',
        bodyMessage: 'คุณยืนยันการแก้ไขข้อมูลสินค้าหรือไม่',
        callBackFunction: async (status: boolean) => {
          if (status) {
            if (imageFile) {
              await uploadImage(imageFile)
                .then((result) => {
                  const { location } = result.data;
                  onUpdateProductDetail({ image: location });
                  sendUpdateData({ ...product, image: location });
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
              sendUpdateData(product);
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

  const sendUpdateData: (product: IProduct) => void = (product: IProduct) => {
    if (product) {
      const { promotion, createAt, updateAt, ...cutProduct } = product;

      updateProduct({
        variables: {
          ...cutProduct,
        },
      });

      setDefaultProductDetail(productDetail);

      setTimeout(() => {
        updateModalAndToggle({
          isHasAccept: true,
          isHasDecline: false,
          title: 'แก้ไขข้อมูลสินค้าสำเร็จ',
          bodyMessage: 'การแก้ไขข้อมูลสินค้านี้เสร็จสิ้น',
          callBackFunction: (status: boolean) => {},
        });
      }, 1000);
    }
  };

  const resetForm = () => {
    setProductDetail(defaultProductDetail);
  };

  const renderFormContent = () => {
    if (queryLoading || isFetching) return <Loading isFullscreen={false} />;
    else if (queryError) return <h1>เกิดข้อผิดพลาด กรุณาติดต่อกับผู้พัฒนา</h1>;
    else if (!productDetail) {
      return <h1>ขออภัย, ดูเหมือนเราจะไม่พบสินค้าทีคุณต้องการ</h1>;
    }

    return (
      <div className="mt-8">
        <Navigator listOfNode={['จัดการ', '>>', 'จัดการสินค้า', '>>', 'แก้ไขข้อมูลสินค้า']} />
        <div className="lg:px-20 md:px-10 py-10">
          <h2 className="text-2xl mb-4">
            <CollectionIcon className="h-6 w-6 inline-flex" /> แก้ไขข้อมูลสินค้า
          </h2>
          <form onSubmit={handleSubmitForm}>
            <div className="grid grid-cols-6 gap-6 my-3">
              <div className="col-span-6 md:col-span-3">
                <img
                  src={
                    imageFile
                      ? URL.createObjectURL(imageFile)
                      : productDetail.image
                      ? productDetail.image
                      : 'https://via.placeholder.com/240'
                  }
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
                    value={productDetail.name}
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
                  <label
                    htmlFor="product_brand"
                    className="block text-md font-medium text-dark-200"
                  >
                    แบรนด์สินค้า *
                  </label>
                  <input
                    type="text"
                    name="product_brand"
                    id="product_brand"
                    required
                    value={productDetail.brand}
                    onChange={handleProductBrandChange}
                    className="form-input rounded-md mt-1 px-2 py-2 w-full lg:w-3/4 shadow-sm sm:text-sm"
                  />
                </div>
                <div className="my-2">
                  <label
                    htmlFor="product_price"
                    className="block text-md font-medium text-dark-200"
                  >
                    ราคาสินค้า *
                  </label>
                  <input
                    type="number"
                    name="product_price"
                    id="product_price"
                    min={0}
                    required
                    value={productDetail.price}
                    onChange={handleProductPriceChange}
                    className="form-input rounded-md mt-1 px-2 py-2 w-full lg:w-3/4 shadow-sm sm:text-sm"
                  />
                </div>
                <div className="my-2">
                  <label
                    htmlFor="product_image"
                    className="block text-md font-medium text-dark-200"
                  >
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
                    htmlFor="product_stock"
                    className="block text-md font-medium text-dark-200"
                  >
                    จำนวนสินค้า
                  </label>
                  <input
                    type="number"
                    name="product_stock"
                    id="product_stock"
                    min={0}
                    value={productDetail.stock}
                    onChange={handleProductStockChange}
                    className="form-input rounded-md mt-1 px-2 py-2 w-full lg:w-3/4 shadow-sm sm:text-sm"
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
                    data={productDetail.description}
                    onChange={handleProductDescriptionChange}
                  />
                </div>
                <div className="flex flex-wrap gap-3 my-4">
                  <input
                    type="submit"
                    className="py-2 px-4 bg-gold-100 text-dark-100 font-semibold rounded-lg shadow-md hover:bg-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-100 focus:ring-opacity-75 cursor-pointer"
                    value="ยืนยันการแก้ไขข้อมูลสินค้า"
                  />
                  <input
                    type="reset"
                    onClick={resetForm}
                    className="py-2 px-4 bg-dark-100 text-white-100 font-semibold rounded-lg shadow-md hover:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-dark-100 focus:ring-opacity-75 cursor-pointer"
                    value="คืนค่าเดิมของสินค้า"
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

export default EditProductPage;
