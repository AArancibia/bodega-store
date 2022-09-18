import { CartItem } from '../../interfaces/CartItem';

export interface CartState {
  cartItems: Array<CartItem>;
  toggleCart: boolean;
  currentItem: CartItem;
}
