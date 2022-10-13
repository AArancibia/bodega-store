import { combineReducers } from 'redux';
import storage from "redux-persist/lib/storage";
import userReducer from './user/user.reducer';
import productReducer from './product/product.reducer';
import cartReducer from './cart/cart.reducer';
import { persistReducer } from 'redux-persist';
import {loaderReducer} from "./loader/loader.reducer";
import {saleReducer} from "./sale/sale.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", 'user']
};


const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
  loader: loaderReducer,
  sale: saleReducer,
})

export default persistReducer(persistConfig, rootReducer);
