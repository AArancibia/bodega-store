import React from 'react';
import CartItem from '../cart-item/CartItem.component';
import './CartDropdown.component.scss';
import { Button } from 'antd';

interface Props {
  cartItems: any[];
}

const CartDropDown = ({ cartItems }: Props) => (
  <div className="cart-dropdown">
    <div style={{
      height: '240px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'scroll',
    }}>
      {cartItems.length ? (
        cartItems.map(({ id, ...cartItem }) => (
          <CartItem key={id} item={cartItem}></CartItem>
        ))
      ) : (
        <>No hay items seleccionados</>
      )}
    </div>
    <Button
      type="ghost"
      className="cart-button"
      onClick={() => {
        // history.push("/checkout");
        // dispatch(toggleCartHidden());
      }}
    >Ir al carrito</Button>
    {/*<AddButton
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </AddButton>*/}
  </div>
);

export default CartDropDown;
