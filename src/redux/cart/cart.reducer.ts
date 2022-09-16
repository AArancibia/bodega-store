import { CartState } from './cart-state.interface';
import { CartActionTypes } from './cart.types';
import { CartUtil } from './cart.util';

const INITIAL_STATE: CartState = {
  cartItems: [],
  toggleCart: false,
};

const cartReducer = (state: CartState = INITIAL_STATE, action: {type: string; payload: any}) => {
  switch (action.type) {
    case CartActionTypes.ADD_CART_ITEM:
      action.payload.count += 1;
      return {
        ...state,
        cartItems: CartUtil.addCartItem(state, action),
      }
    case CartActionTypes.REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(cartItem => cartItem.product.id !== action.payload),
      }
    case CartActionTypes.CLEAR_ITEM:
      return {
        ...state,
        cartItems: CartUtil.clearCartItem(state, action.payload),
      }
    case CartActionTypes.TOGGLE_CART:
      return {
        ...state,
        toggleCart: !state.toggleCart,
      }
    default:
        return state;
  }
}

export default cartReducer;
