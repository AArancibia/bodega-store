import './CheckOut.component.scss';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectTotalPrice } from '../../redux/cart/cart.selector';
import { connect } from 'react-redux';
import { CartItem } from '../../interfaces/CartItem';
import { CheckoutItem } from '../../components/checkout-item/checkout-item.component';
import { addCartItem, clearCartItem, removeCartItem } from '../../redux/cart/cart.actions';

interface Props {
  cartItems: Array<CartItem>;
  total: number
  removeCartItem: (id: string) => void;
  clearItem: (cartItem: CartItem) => void;
  addCartItem: (cartItem: CartItem) => void;
}

const CheckOutPage = ({cartItems, total, removeCartItem, clearItem, addCartItem}: Props) => {
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
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
        <span>TOTAL: ${total}</span>
      </div>
      <div className="test-warning">
        *Please use the following test credit card for payments*
        <br />
        424242424242424242 -Exp: 01/20 -CVV: 123
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectTotalPrice,
});

const mapDispatchToProps = (dispatch: any) => ({
  removeCartItem: (id: string) => dispatch(removeCartItem(id)),
  clearItem: (cartItem: CartItem) => dispatch(clearCartItem(cartItem)),
  addCartItem: (cartItem: CartItem) => dispatch(addCartItem(cartItem)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckOutPage);
