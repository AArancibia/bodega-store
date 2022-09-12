import React, { useState } from 'react';
import Logo from '../../assets/shopping-bag.svg';
import './Header.component.styles.scss';
import { Layout } from 'antd';
import CartDropDown from '../cart-dropdown/Cart-Dropdown.component';
import CartIconComponent from '../cart-icon/CartIcon.component';

const { Header } = Layout;

const HeaderComponent = () => {
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
        showCart && <CartDropDown cartItems={[]} />
      }
    </>
  );
};

export default HeaderComponent;
