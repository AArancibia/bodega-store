import React, { useState } from 'react';
import Logo from '../../assets/shopping-bag.svg';
import './Header.component.styles.scss';
import { Layout } from 'antd';
import CartDropDown from '../cart-dropdown/Cart-Dropdown.component';
import CartIconComponent from '../cart-icon/CartIcon.component';
import { createStructuredSelector } from 'reselect';
import { selectAllProducts } from '../../redux/product/product.selector';
import { connect } from 'react-redux';
import { Product } from '../../interfaces/Product';

const { Header } = Layout;

interface Props {
  products: Array<Product>; //  should be cartItems with their own interface
}

const HeaderComponent = ({products}: Props) => {
  console.log(products);
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
        showCart && <CartDropDown cartItems={products} />
      }
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  products: selectAllProducts,
});
export default connect(mapStateToProps)(HeaderComponent);
