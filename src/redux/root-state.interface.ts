import { CartState } from './cart/cart-state.interface';
import { ProductState } from './product/product-state.interface';
import { UserState } from './user/user-state.interface';

export interface RootState {
  user: UserState,
  product: ProductState,
  cart: CartState,
}
