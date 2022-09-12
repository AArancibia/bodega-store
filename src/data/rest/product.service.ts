import axios from 'axios';

const url = 'http://localhost:4000/api/';

export const getProducts = (): Promise<Array<any>> => {
  return new Promise(((resolve, reject) => {
    axios.get(url + 'product', {
    })
      .then(((results) => results.data))
      .then(products => resolve(products))
      .catch(e => reject(e))
  }));
}
