import './CheckOut.component.scss';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectTotalPrice } from '../../redux/cart/cart.selector';
import { connect } from 'react-redux';
import { CartItem } from '../../interfaces/CartItem';
import { CheckoutItem } from '../../components/checkout-item/checkout-item.component';
import {addCartItem, clearCart, clearCartItem, removeCartItem} from '../../redux/cart/cart.actions';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { User } from '../../interfaces/user/User';
import {fetchLoginSuccess} from "../../redux/user/user.actions";
import {hideLoader, showLoader} from "../../redux/loader/loader.actions";
import {usePaypalPayment} from '../../data/hooks/usePaypalPayment';
import SubmitPaymentComponent from '../../components/submit-payment/SubmitPayment.component';

interface Props {
  cartItems: Array<CartItem>;
  total: number;
  removeCartItem: (id: string) => void;
  clearItem: (cartItem: CartItem) => void;
  clearCart: () => void,
  addCartItem: (cartItem: CartItem) => void;
  currentUser: User;
  fetchUserInformation: (user: User) => void;
  showLoader: () => void;
  hideLoader: () => void;
}

const CheckOutPage = ({cartItems, total, removeCartItem, clearItem, addCartItem}: Props) => {
  const {token} = usePaypalPayment();

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Descripción</span>
        </div>
        <div className="header-block">
          <span>Cantidad</span>
        </div>
        <div className="header-block">
          <span>Precio</span>
        </div>
        <div className="header-block">
          <span>Remover</span>
        </div>
      </div>
      {
        cartItems.map(cartItem => (
          <CheckoutItem
            key={cartItem.product.id}
            cartItem={cartItem}
            removeCartItem={removeCartItem}
            clearItem={clearItem}
            addCartItem={addCartItem}
          />
        ))
      }
      <div className="total">
        <span>TOTAL: S/. {total}</span>
      </div>
      {
        total > 0 && token && (
          <div className="checkout-payment">
            <SubmitPaymentComponent token={token} cartItems={cartItems} total={total}></SubmitPaymentComponent>
          </div>
        )
      }
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectTotalPrice,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch: any) => ({
  removeCartItem: (id: string) => dispatch(removeCartItem(id)),
  clearItem: (cartItem: CartItem) => dispatch(clearCartItem(cartItem)),
  clearCart: () => dispatch(clearCart()),
  addCartItem: (cartItem: CartItem) => dispatch(addCartItem(cartItem)),
  fetchUserInformation: (user: User) => dispatch(fetchLoginSuccess(user)),
  showLoader: () => dispatch(showLoader()),
  hideLoader: () => dispatch(hideLoader()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckOutPage);
