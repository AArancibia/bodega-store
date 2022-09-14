import { Product } from '../../interfaces/Product';

export interface ProductActions {
  type: string;
  payload: any;
}

export const setProducts = (products: Array<Product>) => ({
  type: 'SET_PRODUCTS',
  payload: products,
})
