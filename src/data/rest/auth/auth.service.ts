import axios from 'axios';
import { Constants } from '../../../utils/constants';

export const login = (username: string, password: string) => {
  return new Promise(((resolve, reject) => {
    axios.post(Constants.URL + 'auth/login', {
      username,
      password
    })
      .then(((results) => results.data))
      .then((value) => resolve(value))
      .catch(e => reject(e))
  }));
}
