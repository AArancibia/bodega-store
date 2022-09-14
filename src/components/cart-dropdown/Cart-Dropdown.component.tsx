import React from 'react';
import CartItem from '../cart-item/CartItem.component';
import './CartDropdown.component.scss';
import { Button } from 'antd';
import { Product } from '../../interfaces/Product';
import { useNavigate } from 'react-router-dom';


interface Props {
  cartItems: Product[];
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
          navigate('/carrito');
          // dispatch(toggleCartHidden());
        }}
      >Ir al carrito</Button>
    </div>
  );

}
export default CartDropDown;
