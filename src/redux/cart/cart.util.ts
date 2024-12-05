import { CartState } from './cart-state.interface';
import { CartItem } from '../../domain/interfaces/CartItem';

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

  public static clearCartItem(state: CartState, {product}: CartItem) {
    const currentCartItem = state.cartItems.find(x => x.product.id === product.id);
    if (currentCartItem && currentCartItem.count === 1) {
      return state.cartItems.filter(x => x.product.id !== currentCartItem.product.id);
    }
    return state.cartItems.map(cartItem => cartItem.product.id === product.id ? { count: cartItem.count - 1, product: cartItem.product } : cartItem)
  }
}
