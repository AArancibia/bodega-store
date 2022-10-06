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
import {selectCurrentUser} from "../../redux/user/user.selector";
import {User} from "../../interfaces/user/User";
import {Helpers} from "../../utils/helpers";

const { Header } = Layout;

interface Props {
  cartItems: Array<CartItem>;
  toggleCart: boolean;
  setToggleCart: () => void;
  user: User;
}

const HeaderComponent = ({cartItems, toggleCart, setToggleCart, user}: Props) => {

  const navigate = useNavigate();

  return (
    <>
      <Header className="header flex-no-wrap justify-content-between align-items-center" >
        <img src={Logo} alt="" onClick={() => navigate('/')}/>
        <div className="header__info">
          { user && (<span>{Helpers.fullName(user)}</span>)}
          <CartIconComponent onClickIcon={() => setToggleCart()} cartItems={cartItems} />
        </div>
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
  user: selectCurrentUser,
});

const mapDispatchToProps = (dispatch: any) => ({
  setToggleCart: () => dispatch(setToggleCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
