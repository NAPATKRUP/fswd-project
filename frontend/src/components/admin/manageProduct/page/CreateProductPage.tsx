import React, { FC, useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ICreateProduct, IProduct } from '../../../commons/type/IProduct';
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT_MUTATION } from '../../../../graphql/createProductMutation';

const CreateProductPage: FC = () => {
  const [productDetail, setProductDetail] = useState<ICreateProduct>({
    name: '',
    brand: '',
    price: 0,
    description: '',
  });
  const [createProduct, { error }] = useMutation<{ createProduct: IProduct }, ICreateProduct>(
    CREATE_PRODUCT_MUTATION
  );

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
    const image = event.target.value;
    onUpdateProductDetail({ image });
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
    if (productDetail.name && productDetail.brand && productDetail.price) {
      createProduct({
        variables: {
          ...productDetail,
        },
      });
    } else {
      // should popup error: required field are not fullfill.
      console.log('required field not meet');
    }
  };

  return (
    <div>
      <h2 className="text-2xl">สร้างสินค้าใหม่</h2>
      <form onSubmit={handleSubmitForm}>
        <div className="grid grid-cols-6 gap-6 my-3">
          <div className="col-span-6 sm:col-span-3">
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
                className="form-input rounded-md mt-1 px-2 py-2 sm:w-full md:w-1/2 lg:w-3/4 shadow-sm sm:text-sm"
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
                className="form-input rounded-md mt-1 px-2 py-2 sm:w-full md:w-1/2 lg:w-3/4 shadow-sm sm:text-sm border-dark-400"
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
                className="form-input rounded-md mt-1 px-2 py-2 sm:w-full md:w-1/2 lg:w-3/4 shadow-sm sm:text-sm"
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
                required
                onChange={handleProductPriceChange}
                className="form-input rounded-md mt-1 px-2 py-2 sm:w-full md:w-1/2 lg:w-3/4 shadow-sm sm:text-sm"
              />
            </div>
            <div className="my-2">
              <label htmlFor="product_image" className="block text-md font-medium text-dark-200">
                รูปสินค้า
              </label>
              <input
                type="text"
                name="product_image"
                id="product_image"
                onChange={handleProductImageChange}
                className="form-input rounded-md mt-1 px-2 py-2 sm:w-full md:w-1/2 lg:w-3/4 shadow-sm sm:text-sm"
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
                className="py-2 px-4 bg-gold-200 text-white font-semibold rounded-lg shadow-md hover:bg-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-100 focus:ring-opacity-75"
                value="ยืนยันการสร้างสินค้าใหม่"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProductPage;
