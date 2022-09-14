import { createSelector } from 'reselect';
import { RootState } from '../root-state.interface';

const selectProducts = (state: RootState) => state.product.products;

export const selectAllProducts = createSelector(
  [selectProducts],
  products => products
)
