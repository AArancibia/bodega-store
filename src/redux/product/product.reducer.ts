import { ProductActions } from './product.actions';
import { ProductActionTypes } from './product.types';
import { ProductState } from './product-state.interface';

const INITIAL_STATE: ProductState = {
  products: []
}

const productReducer = (state = INITIAL_STATE, action: ProductActions) => {
  switch (action.type) {
    case ProductActionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      }
    default:
      return state;
  }
}

export default productReducer;
