import React, { useState } from 'react';
import './Header.component.styles.scss';
import { Layout } from 'antd';
import CartDropDown from '../cart-dropdown/Cart-Dropdown.component';
import CartIconComponent from '../cart-icon/CartIcon.component';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selector';
import { CartItem } from '../../interfaces/CartItem';

const { Header } = Layout;

interface Props {
  cartItems: Array<CartItem>;
}

const HeaderComponent = ({cartItems}: Props) => {

  const [showCart, setShowCart] = useState(false);

  const handleClick = () => {
    setShowCart(prev => !prev);
  }

  return (
    <>
      <Header className="header flex-no-wrap justify-content-between align-items-center" >
        <div>LOGO</div>
        <CartIconComponent onClickIcon={handleClick} />
      </Header>
      {
        showCart && <CartDropDown cartItems={cartItems} />
      }
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});
export default connect(mapStateToProps)(HeaderComponent);
