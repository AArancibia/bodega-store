import { RootState } from '../root-state.interface';
import { createSelector } from 'reselect';

const cartSelector = (state: RootState) => state.cart;

export const selectCartItems = createSelector(
  [cartSelector],
  state => state.cartItems
)
