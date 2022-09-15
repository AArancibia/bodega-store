import React from 'react';
import CartItemComponent from '../cart-item/CartItem.component';
import './CartDropdown.component.scss';
import { Button } from 'antd';
import { Product } from '../../interfaces/Product';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../../interfaces/CartItem';


interface Props {
  cartItems: CartItem[];
}

const CartDropDown = ({ cartItems }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="cart-dropdown">
      <div style={{
        height: '240px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'scroll',
      }}>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItemComponent key={cartItem.product.id} cartItem={cartItem}></CartItemComponent>
          ))
        ) : (
          <>No hay items seleccionados</>
        )}
      </div>
      <Button
        type="ghost"
        className="cart-button"
        onClick={() => {
          navigate('/carrito');
          // dispatch(toggleCartHidden());
        }}
      >Ir al carrito</Button>
    </div>
  );

}
export default CartDropDown;
