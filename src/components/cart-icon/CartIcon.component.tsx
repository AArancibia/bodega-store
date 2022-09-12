import React from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './CartIcon.component.scss';

interface Props {
  onClickIcon: () => void;
}

const CartIconComponent = ({onClickIcon}: Props) => {
  return (
    <div className="cart-icon" onClick={onClickIcon}>
      <ShoppingIcon className="cart-icon__logo"/>
      <span className="item-count">{1}</span>
    </div>
  );
};

export default CartIconComponent;
