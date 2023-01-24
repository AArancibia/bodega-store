import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {Button, Layout, Popover} from 'antd';
import CartDropDown from '../cart-dropdown/Cart-Dropdown.component';
import CartIconComponent from '../cart-icon/CartIcon.component';
import { selectCartItems, selectToggleCart } from '../../redux/cart/cart.selector';
import { CartItem } from '../../interfaces/CartItem';
import { setToggleCart } from '../../redux/cart/cart.actions';
import Logo from '../../assets/img/logo.png';
import './Header.component.styles.scss';
import {Link, useNavigate} from 'react-router-dom';
import {selectCurrentUser} from "../../redux/user/user.selector";
import {User} from "../../interfaces/user/User";
import {Helpers} from "../../utils/helpers";
import {GiftOutlined} from '@ant-design/icons'
import {selectLottery} from '../../redux/lottery/lottery.selector';
import {Lottery} from '../../interfaces/Lottery';

const { Header } = Layout;

interface Props {
  cartItems: Array<CartItem>;
  toggleCart: boolean;
  setToggleCart: () => void;
  user: User;
  lottery: Lottery;
}

const content = (user: User, navigate: Function) => (
  <div>
    {
      user ? user.tickets.map((ticket: any) => (
        <div>Número de ticket: <strong>{ticket.code}</strong></div>
      )) : (
        <div>Inicia sesión para verificar tus tickets</div>
      )
    }
    <Button className="btn btn-default mt-20" block onClick={() => navigate('/sorteo')}>Ir al sorteo</Button>
  </div>
);

const HeaderComponent = ({cartItems, toggleCart, setToggleCart, user, lottery}: Props) => {

  const navigate = useNavigate();

  return (
    <>
      <Header className="header flex-no-wrap justify-content-between align-items-center" >
        <img src={Logo} alt="" onClick={() => navigate('/')}/>
        <div className="header__info">
          { user && (<Link to="/informacion" className="color-black">{Helpers.fullName(user)}</Link>)}
          {
            lottery && (
              <Popover placement="bottom" content={() => content(user, navigate)} title="Estos son tus tickets">
                <GiftOutlined style={{ fontSize: '32px', padding: '0 0 0 15px', color: '#08c' }}/>
              </Popover>
            )
          }
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
  lottery: selectLottery,
});

const mapDispatchToProps = (dispatch: any) => ({
  setToggleCart: () => dispatch(setToggleCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
