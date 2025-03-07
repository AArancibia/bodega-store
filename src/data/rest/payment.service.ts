import axios from 'axios';
import {Constants} from '../../utils/constants';
import {CartItem} from '../../domain/interfaces/CartItem';
import {QRCode} from '../../domain/interfaces/QRCode';



export const createQr = (orderItems: CartItem[], total: number): Promise<QRCode> => {
  return new Promise(((resolve, reject) => {
    axios.post(`${Constants.URL_MS_1}payment/paypay/createQr`, {
      amount: {
        amount: total,
      },
      orderItems: orderItems.map((item: CartItem) => ({
        name: item.product.name,
        category: item.product.categoryId,
        unitPrice: {
          amount: item.product.unitPrice,
          currency: "JPY"
        },
        quantity: item.count,
        productId: item.product.id,
      }))
    })
      .then(((results) => results.data))
      .then(qrCode => resolve(qrCode))
      .catch(e => reject(e))
  }));
}
