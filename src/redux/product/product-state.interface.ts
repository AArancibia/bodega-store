import { Product } from '../../interfaces/Product';
import {Category} from '../../interfaces/Category';

export interface ProductState {
  products: Array<Product>;
  categories: Array<Category>;
}
