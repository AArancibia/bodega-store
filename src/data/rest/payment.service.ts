import axios from 'axios';
import {Constants} from '../../utils/constants';

export const createQr = (): Promise<any> => {
  return new Promise(((resolve, reject) => {
    axios.post(`${Constants.URL_MS_1}/payment/paypay/createQr`, {
    })
      .then(((results) => results.data))
      .then(products => resolve(products))
      .catch(e => reject(e))
  }));
}
