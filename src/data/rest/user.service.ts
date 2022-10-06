import axios from 'axios';
import { Constants } from '../../utils/constants';
import { User } from '../../interfaces/user/User';

export const userInformation = (username: string): Promise<User> => {
  return new Promise(((resolve, reject) => {
    axios.get(Constants.URL + `user/${username}`)
      .then(((results) => results.data))
      .then((value) => resolve(value))
      .catch(e => reject(e))
  }));
}

export const updateUser = (id: string, user: Partial<User>): Promise<User> => {
  return new Promise(((resolve, reject) => {
    axios.put(Constants.URL + `user/update/${id}`, {...user})
        .then(((results) => results.data))
        .then((value) => resolve(value))
        .catch(e => reject(e))
  }));
}
