import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Layout } from 'antd';
import CartDropDown from '../cart-dropdown/Cart-Dropdown.component';
import CartIconComponent from '../cart-icon/CartIcon.component';
import { selectCartItems, selectToggleCart } from '../../redux/cart/cart.selector';
import { CartItem } from '../../interfaces/CartItem';
import { setToggleCart } from '../../redux/cart/cart.actions';
import Logo from '../../assets/img/logo.png';
import './Header.component.styles.scss';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

interface Props {
  cartItems: Array<CartItem>;
  toggleCart: boolean;
  setToggleCart: () => void;
}

const HeaderComponent = ({cartItems, toggleCart, setToggleCart}: Props) => {

  const navigate = useNavigate();

  return (
    <>
      <Header className="header flex-no-wrap justify-content-between align-items-center" >
        <img src={Logo} alt="" onClick={() => navigate('/')}/>
        <CartIconComponent onClickIcon={() => setToggleCart()} cartItems={cartItems} />
      </Header>
      {
        toggleCart && <CartDropDown cartItems={cartItems} setToggleCart={setToggleCart} />
      }
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  toggleCart: selectToggleCart,
});

const mapDispatchToProps = (dispatch: any) => ({
  setToggleCart: () => dispatch(setToggleCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
