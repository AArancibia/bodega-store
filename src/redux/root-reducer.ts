import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import productReducer from './product/product.reducer';
import cartReducer from './cart/cart.reducer';

export default combineReducers({
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
})
