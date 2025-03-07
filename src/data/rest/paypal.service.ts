import axios from 'axios';
import {Constants} from '../../utils/constants';
import {IdentityPayPalToken, PayPalToken} from '../../domain/interfaces/PayPalToken';
import {Order} from '../../domain/interfaces/Order';
import {v4 as uuidV4} from 'uuid';
import {CartItem} from '../../domain/interfaces/CartItem';
import {Sale, SaleDetail} from '../../domain/interfaces/Sale';
import {User} from '../../domain/interfaces/user/User';

export const createPaypalToken = (): Promise<PayPalToken> => {
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  return new Promise(((resolve, reject) => {
    axios.post(Constants.URL_PAYPAL_V1 + '/oauth2/token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      auth: {
        username: process.env.REACT_APP_PAYPAL_CLIENT_ID!,
        password: process.env.REACT_APP_API_URL_PAYPAL_PASSWORD!,
      },
    })
      .then(((results) => results.data))
      .then((value) => resolve(value))
      .catch(e => reject(e))
  }));
}

export const generateIdentityPaypalToken = (): Promise<IdentityPayPalToken> => {
  return new Promise(((resolve, reject) => {
    axios.post(Constants.URL_PAYPAL_V1 + '/identity/generate-token', {}, {
      auth: {
        username: process.env.REACT_APP_PAYPAL_CLIENT_ID!,
        password: process.env.REACT_APP_API_URL_PAYPAL_PASSWORD!,
      },
    })
      .then(((results) => results.data))
      .then((value) => resolve(value))
      .catch(e => reject(e))
  }));
}

export const createOrder = (cartItems: Array<CartItem>, total: number): Promise<Order> => {
  const items = cartItems.map((cartItem) => ({
    name: cartItem.product.name,
    description: cartItem.product.name,
    quantity: cartItem.count,
    unit_amount: {
      currency_code: "USD",
      value: cartItem.product.unitPrice,
    }
  }));
  const body = {
    "intent": "CAPTURE",
    purchase_units: [
      {
        items,
        amount: {
          currency_code: "USD",
          value: total,
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: total
            }
          }
        }
      }
    ],
    application_context: {
      brand_name: 'arancibia@company.com',
      landing_page: "LOGIN"
    }
  };
  return new Promise(((resolve, reject) => {
    axios.post(Constants.URL_MS_1 + 'sale/order', body)
      .then(((results) => results.data))
      .then((value) => resolve(value))
      .catch(e => reject(e))
  }));
}

export const approveOrder = (orderId: string, cartItems: Array<CartItem>, total: number, user: User) => {
  const saleDetail: Array<SaleDetail> = cartItems.map(x => ({
    id: uuidV4(),
    price: x.product.unitPrice,
    quantity: x.count,
    productId: x.product.id,
  }));
  const sale = {
    id: uuidV4(),
    saleDetail,
    dateRegister: new Date().toISOString(),
    salePrice: total,
    code: String(new Date().getTime()),
    userId: user.id,
  } as Sale;
  return new Promise(((resolve, reject) => {
    axios.post(Constants.URL_MS_1 + `sale/order/${orderId}/capture`, sale)
      .then(((results) => results.data))
      .then((value) => resolve(value))
      .catch(e => reject(e))
  }));
}
