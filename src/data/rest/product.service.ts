import axios from 'axios';
import { Constants } from '../../utils/constants';

export const getProducts = (): Promise<Array<any>> => {
  return new Promise(((resolve, reject) => {
    axios.get(Constants.URL + 'products', {
    })
      .then(((results) => results.data))
      .then(products => resolve(products))
      .catch(e => reject(e))
  }));
}
