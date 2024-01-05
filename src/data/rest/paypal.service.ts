import axios from 'axios';
import {Constants} from '../../utils/constants';
import {IdentityPayPalToken, PayPalToken} from '../../interfaces/PayPalToken';
import {Order} from '../../interfaces/Order';
import {CartItem} from '../../interfaces/CartItem';
import {Sale, SaleDetail} from '../../interfaces/Sale';
import {v4 as uuidV4} from 'uuid';

export const createPaypalToken = (): Promise<PayPalToken> => {
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  return new Promise(((resolve, reject) => {
    axios.post(Constants.URL_PAYPAL_V1 + '/oauth2/token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      auth: {
        username: 'AYezhSG1lTyPxcZy2qjIf9Xvg4f8jyeFFdLpmGTyqeCxar7uyjH7LmwJKnIcYbwlJYnk6cvcu4rD9ZF3',
        password: 'EG9S3bS-zmUJFy33iTXucZdVdOOesZNAGZG1BswlxV14qKrWogDgTxSj_lhhcu7ew5pivqxafDdryboT'
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
        username: 'AYezhSG1lTyPxcZy2qjIf9Xvg4f8jyeFFdLpmGTyqeCxar7uyjH7LmwJKnIcYbwlJYnk6cvcu4rD9ZF3',
        password: 'EG9S3bS-zmUJFy33iTXucZdVdOOesZNAGZG1BswlxV14qKrWogDgTxSj_lhhcu7ew5pivqxafDdryboT'
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

export const approveOrder = (orderId: string, cartItems: Array<CartItem>, total: number) => {
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
  } as Sale;
  return new Promise(((resolve, reject) => {
    axios.post(Constants.URL_MS_1 + `sale/order/${orderId}/capture`, sale)
      .then(((results) => results.data))
      .then((value) => resolve(value))
      .catch(e => reject(e))
  }));
}
