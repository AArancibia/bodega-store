import React from 'react';
import Logo from '../../assets/shopping-bag.svg';
import './Header.component.styles.scss';

const Header = () => {
  return (
    <div className="header flex-no-wrap justify-content-between align-items-center">
      <div>jj</div>
      <img width="50" className="header__logo" src={Logo} alt="SHOP ICON"/>
    </div>
  );
};

export default Header;
