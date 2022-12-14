import { CartState } from './cart-state.interface';
import { CartActionTypes } from './cart.types';
import { CartUtil } from './cart.util';
import { CartItem } from '../../interfaces/CartItem';

const INITIAL_STATE: CartState = {
  cartItems: [],
  toggleCart: false,
  currentItem: {} as CartItem,
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
    case CartActionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      }
    case CartActionTypes.TOGGLE_CART:
      return {
        ...state,
        toggleCart: !state.toggleCart,
      }
    case CartActionTypes.GET_CART_ITEM:
      return {
        ...state,
        currentItem: state.cartItems.find(x => x.product.id === action.payload),
      }
    default:
        return state;
  }
}

export default cartReducer;
