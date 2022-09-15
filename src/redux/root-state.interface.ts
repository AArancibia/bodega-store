import { Product } from '../interfaces/Product';
import { CartItem } from '../interfaces/CartItem';

export interface RootState {
  user: {
    currentUser: {},
  };
  product: {
    products: Array<Product>,
  },
  cart: {
    cartItems: Array<CartItem>,
  }
}
