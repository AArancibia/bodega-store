import './CheckOut.component.scss';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectTotalPrice } from '../../redux/cart/cart.selector';
import { connect } from 'react-redux';
import { CartItem } from '../../domain/interfaces/CartItem';
import { CheckoutItem } from '../../components/checkout-item/checkout-item.component';
import {Button} from 'antd';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { User } from '../../domain/interfaces/user/User';
import React, {useState} from "react";
import {fetchLoginSuccess} from "../../redux/user/user.actions";
import ModalUpdateInformation from "../../components/user/modal-update-information/ModalUpdateInformation.component";
import ModalCheckOutPayment from "../../components/user/modal-checkout-payment/ModalCheckOutPayment.component";
import {hideLoader, showLoader} from "../../redux/loader/loader.actions";

interface Props {
  cartItems: Array<CartItem>;
  total: number;
  currentUser: User;
  fetchUserInformation: (user: User) => void;
  showLoader: () => void;
  hideLoader: () => void;
}

const CheckOutPage = ({cartItems, total, currentUser, fetchUserInformation, showLoader, hideLoader}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPaymentOpen, setIsModalPaymentOpen] = useState(false);

  const onClickPayment = () => {
    setIsModalPaymentOpen(true);
    /*if (!currentUser) {
      navigate('/login');
    } else {
      setIsModalPaymentOpen(true);
      if (currentUser.complete) {
        setIsModalPaymentOpen(true);
      } else {
        setIsModalOpen(true);
      }
    }*/
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
              className="btn btn--default"
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
  fetchUserInformation: (user: User) => dispatch(fetchLoginSuccess(user)),
  showLoader: () => dispatch(showLoader()),
  hideLoader: () => dispatch(hideLoader()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckOutPage);
