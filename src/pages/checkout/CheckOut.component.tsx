import React from 'react';
import './CheckOut.component.scss';

const CheckOutPage = () => {
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {
        /*cartItems.map(cartItem => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))*/
      }
      <div className="total">
        <span>TOTAL: ${0}</span>
      </div>
      <div className="test-warning">
        *Please use the following test credit card for payments*
        <br />
        424242424242424242 -Exp: 01/20 -CVV: 123
      </div>
    </div>
  );
};

export default CheckOutPage;
