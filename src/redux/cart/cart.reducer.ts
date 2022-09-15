import { CartState } from './cart-state.interface';
import { CartActionTypes } from './cart.types';
import { CartUtil } from './cart.util';

const INITIAL_STATE: CartState = {
  cartItems: [],
};

const cartReducer = (state: CartState = INITIAL_STATE, action: {type: string; payload: any}) => {
  switch (action.type) {
    case CartActionTypes.ADD_CART_ITEM:
      return {
        ...state,
        cartItems: CartUtil.addCartItem(state, action),
      }
    default:
        return state;
  }
}

export default cartReducer;
