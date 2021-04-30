import { FC, useState, useCallback } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useParams } from 'react-router-dom';
import { IProduct, IUpdateProduct } from '../../../commons/type/IProduct';
import Loading from '../../../commons/loading/Loading';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { PRODUCT_QUERY_BY_ID } from '../graphql/queryProduct';
import { PRODUCT_UPDATE_BY_ID_MUTATION } from '../graphql/updateProduct';

const EditProductPage: FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [productDetail, setProductDetail] = useState<IProduct>();
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const { loading: queryLoading, error: queryError } = useQuery<
    { productById: IProduct },
    { id: string }
  >(PRODUCT_QUERY_BY_ID, {
    variables: {
      id: productId,
    },
    onCompleted: (data: { productById: IProduct }) => {
      const { productById } = data;
      if (productById) setProductDetail(productById);
      setIsFetching(false);
    },
    onError: (error: ApolloError) => {
      console.log(error);
      setIsFetching(false);
    },
  });
  const [updateProduct] = useMutation<{ updateProductById: IProduct }, IUpdateProduct>(
    PRODUCT_UPDATE_BY_ID_MUTATION
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
    onUpdateProductDetail({ name, slug });
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
    const image: string = event.target.value;
    onUpdateProductDetail({ image });
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

      updateProduct({
        variables: {
          ...product,
        },
      });
    } else {
      // should show popup error: required field are not fullfill.
      console.log('required field not meet');
    }
  };

  if (queryLoading || isFetching) return <Loading />;
  else if (queryError) return <h1>Error have been occur, Please contact developers</h1>;
  else if (!productDetail) {
    return <h1>Sorry, Product that you are looking is not found</h1>;
  }

  return (
    <div>
      <h2 className="text-2xl">Edit Product</h2>
      <form onSubmit={handleSubmitForm}>
        <div className="grid grid-cols-6 gap-6 my-3">
          <div className="col-span-6 lg:col-span-3">
            <div className="my-2">
              <label htmlFor="product_slug" className="block text-md font-medium text-dark-200">
                Product slug
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
              <label htmlFor="product_stock" className="block text-md font-medium text-dark-200">
                Product stock
              </label>
              <input
                type="number"
                name="product_stock"
                id="product_stock"
                value={productDetail.stock}
                onChange={handleProductStockChange}
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
                onClick={handleSubmitForm}
                className="py-2 px-4 bg-gold-200 text-white font-semibold rounded-lg shadow-md hover:bg-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-100 focus:ring-opacity-75"
                value="Edit product detail"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
