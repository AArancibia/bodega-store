import {FUNDING, PayPalButtons, PayPalScriptProvider, ReactPayPalScriptOptions} from '@paypal/react-paypal-js';
import React from 'react';
import {IdentityPayPalToken} from '../../interfaces/PayPalToken';
import {approveOrder, createOrder} from '../../data/rest/paypal.service';
import {useNavigate} from 'react-router-dom';
import {Constants} from '../../utils/constants';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../../redux/user/user.selector';
import {User} from '../../interfaces/user/User';
import {clearCart} from '../../redux/cart/cart.actions';
import {CartItem} from '../../interfaces/CartItem';
import './SubmitPayment.component.scss';
import {ApprovedOrder} from '../../interfaces/ApprovedOrder';

interface Props {
  token: IdentityPayPalToken;
  currentUser: User;
  clearCart: () => void;
  cartItems: Array<CartItem>;
  total: number;
}

const SubmitPaymentComponent = ({token, clearCart, cartItems, total, currentUser}: Props) => {
  const navigate = useNavigate();
  const initialOptions = {
    clientId: "AYezhSG1lTyPxcZy2qjIf9Xvg4f8jyeFFdLpmGTyqeCxar7uyjH7LmwJKnIcYbwlJYnk6cvcu4rD9ZF3",
    dataClientToken: token.client_token,
    components: "hosted-fields,buttons,funding-eligibility",
    enableFunding: [FUNDING.PAYPAL, FUNDING.CARD],
  } as ReactPayPalScriptOptions;
  const handleCreateOrder = async (): Promise<string> => {
    if (!currentUser) {
      navigate('/login');
      return Promise.reject();
    }
    try {
      const {id} =  await createOrder(cartItems, total);
      return id;
    } catch (e) {
      return '';
    }
  };

  const handleApprove = async ({orderID}: ApprovedOrder, actions: any): Promise<void> => {
    try {
      const order = await approveOrder(orderID, cartItems, total);
      clearCart();
      navigate('/carrito/pago', {state: {message: Constants.MESSAGES.CHECKOUT_PAYMENT.SUCCESS, order} });
    } catch (e) {
      navigate('/carrito/pago', {state: {message: Constants.MESSAGES.CHECKOUT_PAYMENT.ERROR} });
    }
  };
  return <>
    <PayPalScriptProvider
      options={initialOptions}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={handleCreateOrder}
        onApprove={handleApprove}
      />
    </PayPalScriptProvider>
  </>
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch: any) => ({
  clearCart: () => dispatch(clearCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmitPaymentComponent);
