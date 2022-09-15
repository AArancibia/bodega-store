import { CartState } from './cart-state.interface';
import { CartItem } from '../../interfaces/CartItem';

export class CartUtil {
  public static addCartItem(state: CartState, action: {payload: CartItem}) {
    const cartItemIndex = state.cartItems.findIndex(x => x.product.id === action.payload.product.id);
    if (cartItemIndex !== -1) {
      state.cartItems.splice(cartItemIndex, 1, action.payload);
    } else {
      state.cartItems.push(action.payload);
    }
    return [...state.cartItems];
  }
}
