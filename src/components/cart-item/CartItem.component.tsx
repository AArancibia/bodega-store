import React from 'react';
import './CartItem.component.styles.scss';
import { Product } from '../../interfaces/Product';
import Image from '../../assets/img/not-image.jpg';

interface Props {
  item: Partial<Product>;
}

const CartItem = ({ item: { name, image, quantity, unitPrice } } : Props) => (
  <div className="cart-item">
    <img src={image ? image : Image} alt="item" />
    <div className="item-details">
      <span className="name">{name}</span>
      <span className="price">
        {quantity} x {unitPrice}
      </span>
    </div>
  </div>
);

export default CartItem;
