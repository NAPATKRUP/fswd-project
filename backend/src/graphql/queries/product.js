import { schemaComposer } from "graphql-compose";

import { ProductModel, ProductTC } from "../../models/product";

export const latestProductResolver = schemaComposer.createResolver({
  name: "latestProduct",
  kind: "query",
  type: [ProductTC.getType()],
  args: {
    show: "Int!",
  },
  resolve: async ({ args }) => {
    const { show } = args;
    const product = await ProductModel.find().sort({ updateAt: -1 }).limit(show);
    return product;
  },
});

export const productById = ProductTC.getResolver("findById");
export const productByMany = ProductTC.getResolver("findMany");
