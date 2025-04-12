import React from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './CartIcon.component.scss';
import { CartItem } from '../../domain/interfaces/CartItem';

interface Props {
  onClickIcon: () => void;
  cartItems: Array<CartItem>;
}

const CartIconComponent = ({onClickIcon, cartItems}: Props) => {
  return (
    <div className="cart-icon" onClick={onClickIcon}>
      <ShoppingIcon className="cart-icon__logo"/>
      <span className="item-count">{cartItems.length}</span>
    </div>
  );
};

export default CartIconComponent;
