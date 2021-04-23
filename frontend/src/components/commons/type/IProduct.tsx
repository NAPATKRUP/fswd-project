export interface IProduct {
  _id: number;
  name: string;
  brand: string;
  price: number;
  description?: string;
  image?: string;
  createAt: string;
}

export interface ICreateProduct {
  name?: string;
  brand?: string;
  price?: number;
  description?: string;
  image?: string;
}
