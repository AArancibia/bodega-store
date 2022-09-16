import { Product } from '../interfaces/Product';
import { CartItem } from '../interfaces/CartItem';
import { CartState } from './cart/cart-state.interface';
import { ProductState } from './product/product-state.interface';

export interface RootState {
  user: {
    currentUser: {},
  },
  product: ProductState,
  cart: CartState,
}
