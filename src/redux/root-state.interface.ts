import { Product } from '../interfaces/Product';

export interface RootState {
  user: {
    currentUser: {},
  };
  product: {
    products: Array<Product>,
  }
}
