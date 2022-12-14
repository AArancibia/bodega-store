import { CartItem } from '../../interfaces/CartItem';
import { CartActionTypes } from './cart.types';

export const addCartItem = (cartItem: CartItem) => ({
  type: CartActionTypes.ADD_CART_ITEM,
  payload: cartItem,
})

export const removeCartItem = (id: string) => ({
  type: CartActionTypes.REMOVE_CART_ITEM,
  payload: id,
})

export const clearCartItem = (cartItem: CartItem) => ({
  type: CartActionTypes.CLEAR_ITEM,
  payload: cartItem,
})

export const clearCart = () => ({
  type: CartActionTypes.CLEAR_CART,
})

export const setToggleCart = () => ({
  type: CartActionTypes.TOGGLE_CART,
})

export const getCartItem = (id: string) => ({
  type: CartActionTypes.GET_CART_ITEM,
  payload: id,
})
