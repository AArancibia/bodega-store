import { combineReducers } from 'redux';
import storage from "redux-persist/lib/storage";
import userReducer from './user/user.reducer';
import productReducer from './product/product.reducer';
import cartReducer from './cart/cart.reducer';
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"]
};


const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
})

export default persistReducer(persistConfig, rootReducer);
