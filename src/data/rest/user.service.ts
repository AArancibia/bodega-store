import axios from 'axios';
import { Constants } from '../../utils/constants';

export const userInformation = (username: string) => {
  return new Promise(((resolve, reject) => {
    axios.get(Constants.URL + `user/${username}`)
      .then(((results) => results.data))
      .then((value) => resolve(value))
      .catch(e => reject(e))
  }));
}
