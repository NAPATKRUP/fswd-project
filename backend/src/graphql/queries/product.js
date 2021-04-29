import { schemaComposer } from 'graphql-compose';

import { ProductModel, ProductTC } from '../../models/product';

export const latestProduct = schemaComposer.createResolver({
  name: 'latestProduct',
  kind: 'query',
  type: [ProductTC.getType()],
  args: {
    show: 'Int!',
  },
  resolve: async ({ args }) => {
    const { show } = args;
    const product = await ProductModel.find().sort({ createAt: -1 }).limit(show);
    return product;
  },
});

export const filterProduct = schemaComposer.createResolver({
  name: 'filterProduct',
  kind: 'query',
  type: [ProductTC.getType()],
  args: {
    typeFilter: 'String!',
    name: 'String',
    minPrice: 'Int',
    maxPrice: 'Int',
  },
  resolve: async ({ args }) => {
    const { typeFilter, name, minPrice, maxPrice } = args;

    const sortType = typeFilter.toLowerCase().split('_');

    const minimum = minPrice === undefined ? 0 : minPrice;
    const maximum = maxPrice === undefined ? 100000 : maxPrice;

    let sort;
    if (sortType[0] === 'name') sort = { name: sortType[1] };
    if (sortType[0] === 'brand') sort = { brand: sortType[1] };
    if (sortType[0] === 'price') sort = { price: sortType[1] };

    const product = await ProductModel.find({
      $or: [
        {
          name: { $regex: new RegExp(name, 'i') },
          price: { $gte: minimum, $lte: maximum },
        },
        {
          brand: { $regex: new RegExp(name, 'i') },
          price: { $gte: minimum, $lte: maximum },
        },
      ],
    }).sort(sort);

    return product;
  },
});

export const productBySlug = schemaComposer.createResolver({
  name: 'productBySlug',
  kind: 'query',
  type: ProductTC.getType(),
  args: {
    slug: 'String!',
  },
  resolve: async ({ args }) => {
    const { slug } = args;
    const product = await ProductModel.findOne({ slug });
    return product;
  },
});

export const productById = ProductTC.getResolver('findById');
export const productByMany = ProductTC.getResolver('findMany');
