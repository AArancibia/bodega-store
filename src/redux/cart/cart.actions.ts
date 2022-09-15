import { CartItem } from '../../interfaces/CartItem';
import { CartActionTypes } from './cart.types';

export const addCartItem = (cartItem: CartItem) => ({
  type: CartActionTypes.ADD_CART_ITEM,
  payload: cartItem,
})
