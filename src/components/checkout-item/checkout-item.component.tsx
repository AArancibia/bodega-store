import React, { MouseEventHandler } from "react";
import { connect } from "react-redux";
import { CartItem } from '../../interfaces/CartItem';
import NotFoundImage from '../../assets/img/not-image.jpg';
import "./checkout-item.styles.scss";

interface Props {
  cartItem: CartItem;
  removeCartItem: (id: string) => void;
  clearItem: (cartItem: CartItem) => void;
  addCartItem: (cartItem: CartItem) => void;
}

export const CheckoutItem = ({ cartItem, removeCartItem, clearItem, addCartItem }: Props) => {
  const { count, product: {name, image, unitPrice, id} } = cartItem;

  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={image ? image : NotFoundImage} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => clearItem(cartItem)}>
          &#10094;
        </div>
        <span className="value">{count}</span>
        <div className="arrow" onClick={() => addCartItem(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className="price">{unitPrice}</span>
      <div className="remove-button" onClick={() => removeCartItem(cartItem.product.id)}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
