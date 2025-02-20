import './CheckOut.component.scss';
import { selectCartItems, selectTotalPrice } from '../../redux/cart/cart.selector';
import {connect, useSelector} from 'react-redux';
import { CheckoutItem } from '../../components/checkout-item/checkout-item.component';
import {Button} from 'antd';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { User } from '../../domain/interfaces/user/User';
import React, {useState} from "react";
import {fetchLoginSuccess} from "../../redux/user/user.actions";
import ModalUpdateInformation from "../../components/user/modal-update-information/ModalUpdateInformation.component";
import ModalCheckOutPayment from "../../components/user/modal-checkout-payment/ModalCheckOutPayment.component";
import {hideLoader, showLoader} from "../../redux/loader/loader.actions";
import {createQr} from '../../data/rest/payment.service';
import {useQuery} from '@tanstack/react-query';

interface Props {
  fetchUserInformation: (user: User) => void;
  showLoader: () => void;
  hideLoader: () => void;
}

const CheckOutPage = ({fetchUserInformation, showLoader, hideLoader}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPaymentOpen, setIsModalPaymentOpen] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectTotalPrice);
  const currentUser = useSelector(selectCurrentUser);
  const {data: qrCode} = useQuery({queryKey: ['payPayQrCode'], queryFn: createQr});

  const onClickPayment = () => {
    const link = document.createElement('a');
    link.setAttribute('href', qrCode.data.url);
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
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

const mapDispatchToProps = (dispatch: any) => ({
  fetchUserInformation: (user: User) => dispatch(fetchLoginSuccess(user)),
  showLoader: () => dispatch(showLoader()),
  hideLoader: () => dispatch(hideLoader()),
});

export default connect(null, mapDispatchToProps)(CheckOutPage);
