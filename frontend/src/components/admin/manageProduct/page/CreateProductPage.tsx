import React, { FC, ChangeEvent, ChangeEventHandler, FormEventHandler, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ICreateProduct } from "../../../commons/type/IProduct";

const CreateProductPage: FC = () => {
  const [productDetail, setProductDetail] = useState<ICreateProduct>({
    name: "",
    brand: "",
    price: 0,
    description: "",
    image: "",
  });

  const onUpdateProductDetail = (detail: ICreateProduct) => {
    setProductDetail({
      ...productDetail,
      ...detail,
    });
  };

  const handleProductNameChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.value;
    onUpdateProductDetail({ name });
  };

  const handleProductBrandChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const brand = event.target.value;
    onUpdateProductDetail({ brand });
  };

  const handleProductPriceChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const price: number = parseInt(event.target.value);
    onUpdateProductDetail({ price });
  };

  const handleProductImageChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const image = event.target.value;
    onUpdateProductDetail({ image });
  };

  const handleProductDescriptionChange = (event, editor: any) => {
    const description = editor.getData();
    onUpdateProductDetail({ description });
  };

  const handleSubmitForm: FormEventHandler = (event) => {
    event.preventDefault();
    console.log(productDetail);
  };

  return (
    <div>
      <h2 className="text-2xl">Create New Product</h2>
      <form action="#" method="POST">
        <div className="grid grid-cols-6 gap-6 my-3">
          <div className="col-span-6 sm:col-span-3">
            <div className="my-2">
              <label htmlFor="product_name" className="block text-md font-medium text-dark-200">
                Product name
              </label>
              <input
                type="text"
                name="product_name"
                id="product_name"
                onChange={handleProductNameChange}
                className="form-input rounded-md mt-1 px-2 py-1 w-2/3 shadow-sm sm:text-sm"
              />
            </div>
            <div className="my-2">
              <label htmlFor="product_brand" className="block text-md font-medium text-dark-200">
                Product brand
              </label>
              <input
                type="text"
                name="product_brand"
                id="product_brand"
                onChange={handleProductBrandChange}
                className="form-input rounded-md mt-1 px-2 py-1 w-2/3 shadow-sm sm:text-sm"
              />
            </div>
            <div className="my-2">
              <label htmlFor="product_price" className="block text-md font-medium text-dark-200">
                Product price
              </label>
              <input
                type="number"
                name="product_price"
                id="product_price"
                onChange={handleProductPriceChange}
                className="form-input rounded-md mt-1 px-2 py-1 w-2/3 shadow-sm sm:text-sm"
              />
            </div>
            <div className="my-2">
              <label htmlFor="product_image" className="block text-md font-medium text-dark-200">
                Product image
              </label>
              <input
                type="text"
                name="product_image"
                id="product_image"
                onChange={handleProductImageChange}
                className="form-input rounded-md mt-1 px-2 py-1 w-2/3 shadow-sm sm:text-sm"
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="product_description"
                className="block text-md font-medium text-dark-200"
              >
                Product description
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
                onSubmit={handleSubmitForm}
                className="py-2 px-4 bg-gold-200 text-white font-semibold rounded-lg shadow-md hover:bg-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-100 focus:ring-opacity-75"
                value="Create new product"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProductPage;
