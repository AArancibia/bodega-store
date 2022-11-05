import './CheckOut.component.scss';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectTotalPrice } from '../../redux/cart/cart.selector';
import { connect } from 'react-redux';
import { CartItem } from '../../interfaces/CartItem';
import { CheckoutItem } from '../../components/checkout-item/checkout-item.component';
import {addCartItem, clearCart, clearCartItem, removeCartItem} from '../../redux/cart/cart.actions';
import {Button} from 'antd';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { User } from '../../interfaces/user/User';
import React, {useState} from "react";
import {fetchLoginSuccess} from "../../redux/user/user.actions";
import ModalUpdateInformation from "../../components/user/modal-update-information/ModalUpdateInformation.component";
import ModalCheckOutPayment from "../../components/user/modal-checkout-payment/ModalCheckOutPayment.component";
import {hideLoader, showLoader} from "../../redux/loader/loader.actions";

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

const CheckOutPage = ({cartItems, total, removeCartItem, clearItem, clearCart, addCartItem, currentUser, fetchUserInformation, showLoader, hideLoader}: Props) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPaymentOpen, setIsModalPaymentOpen] = useState(false);

  const onClickPayment = () => {
    if (!currentUser) {
      navigate('/login');
    } else {
      setIsModalPaymentOpen(true);
      /*if (currentUser.complete) {
        setIsModalPaymentOpen(true);
      } else {
        setIsModalOpen(true);
      }*/
    }
  };

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
        total > 0 && (
          <div className="checkout-payment">
            <Button
              type="ghost"
              block
              size={'large'}
              className="checkout-payment__button"
              onClick={onClickPayment}
            >Pagar</Button>
          </div>
        )
      }
      <ModalUpdateInformation
          currentUser={currentUser}
          fetchUserInformation={fetchUserInformation}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          showLoader={showLoader}
          hideLoader={hideLoader}
      />
      <ModalCheckOutPayment
          isModalPaymentOpen={isModalPaymentOpen}
          setIsModalPaymentOpen={setIsModalPaymentOpen}
          showLoader={showLoader}
          hideLoader={hideLoader}
          cartItems={cartItems}
          total={total}
          clearCart={clearCart}
          currentUser={currentUser}
      />
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
