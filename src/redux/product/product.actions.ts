import { Product } from '../../interfaces/Product';
import {Category} from '../../interfaces/Category';
import {ProductActionTypes} from './product.types';

export interface ProductActions {
  type: string;
  payload: any;
}

export const setProducts = (products: Array<Product>) => ({
  type: 'SET_PRODUCTS',
  payload: products,
})

export const setCategories = (categories: Array<Category>) => ({
  type: ProductActionTypes.SET_CATEGORIES,
  payload: categories,
})
