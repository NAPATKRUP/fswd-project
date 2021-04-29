import React, {
  FC,
  ChangeEvent,
  ChangeEventHandler,
  FormEventHandler,
  useState,
  useEffect,
  useCallback,
} from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useParams } from "react-router-dom";
import { ICreateProduct, IProduct } from "../../../commons/type/IProduct";
import product from "../../../commons/__mock__/product";

const EditProductPage: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [productDetail, setProductDetail] = useState<IProduct | undefined>();

  useEffect(() => {
    const findProduct: (slug: string) => IProduct | undefined = (slug: string) => {
      return product.find((item: IProduct) => item._id === parseInt(slug));
    };

    const slugProduct: IProduct | undefined = findProduct(slug);
    if (slugProduct) setProductDetail({ ...slugProduct });
  }, [slug]);

  const onUpdateProductDetail = useCallback(
    (detail: ICreateProduct) => {
      const product: any = { ...productDetail, ...detail };
      setProductDetail(product);
    },
    [productDetail]
  );

  const handleProductNameChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const name: string = event.target.value;
    onUpdateProductDetail({ name });
  };

  const handleProductBrandChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const brand: string = event.target.value;
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
    const image: string = event.target.value;
    onUpdateProductDetail({ image });
  };

  const handleProductDescriptionChange = (event, editor: any) => {
    const description: string = editor.getData();
    onUpdateProductDetail({ description });
  };

  const handleSubmitForm: FormEventHandler = (event) => {
    event.preventDefault();
    console.log(productDetail);

    // to-do: use mutation here
  };

  const renderEditProductDetail = () => {
    if (productDetail) {
      return (
        <form action="#" method="POST">
          <div className="grid grid-cols-6 gap-6 my-3">
            <div className="col-span-6 lg:col-span-3">
              <div className="my-2">
                <label htmlFor="product_name" className="block text-md font-medium text-dark-200">
                  Product name
                </label>
                <input
                  type="text"
                  name="product_name"
                  id="product_name"
                  value={productDetail.name}
                  onChange={handleProductNameChange}
                  className="form-input rounded-md mt-1 px-2 py-2 sm:w-full md:w-1/2 lg:w-3/4 shadow-sm sm:text-sm"
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
                  value={productDetail.brand}
                  onChange={handleProductBrandChange}
                  className="form-input rounded-md mt-1 px-2 py-2 sm:w-full md:w-1/2 lg:w-3/4 shadow-sm sm:text-sm"
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
                  value={productDetail.price}
                  onChange={handleProductPriceChange}
                  className="form-input rounded-md mt-1 px-2 py-2 sm:w-full md:w-1/2 lg:w-3/4 shadow-sm sm:text-sm"
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
                  value={productDetail.image}
                  onChange={handleProductImageChange}
                  className="form-input rounded-md mt-1 px-2 py-2 sm:w-full md:w-1/2 lg:w-3/4 shadow-sm sm:text-sm"
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
                  data={productDetail.description}
                  onChange={handleProductDescriptionChange}
                />
              </div>
              <div className="my-4">
                <input
                  type="submit"
                  onSubmit={handleSubmitForm}
                  className="py-2 px-4 bg-gold-200 text-white font-semibold rounded-lg shadow-md hover:bg-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-100 focus:ring-opacity-75"
                  value="Edit product detail"
                />
              </div>
            </div>
          </div>
        </form>
      );
    } else {
      return <h1>Sorry, Product that you are looking is not found</h1>;
    }
  };

  return (
    <div>
      <h2 className="text-2xl">Edit Product</h2>
      {renderEditProductDetail()}
    </div>
  );
};

export default EditProductPage;