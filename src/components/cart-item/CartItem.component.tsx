import React from 'react';
import './CartItem.component.styles.scss';

interface Props {
  item: {
    imageUrl: string;
    price: number;
    name: string;
    quantity: number;
  }
}

const CartItem = ({ item: { imageUrl, price, name, quantity } } : Props) => (
  <div className="cart-item">
    <img src={imageUrl} alt="item" />
    <div className="item-details">
      <span className="name">{name}</span>
      <span className="price">
        {quantity} x {price}
      </span>
    </div>
  </div>
);

export default CartItem;
