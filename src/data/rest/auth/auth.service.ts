import axios from 'axios';
import { Constants } from '../../../utils/constants';
import { UserRegister, UserRequest } from '../../../interfaces/user/User';
import {v4 as uuidV4} from 'uuid';

export const login = (username: string, password: string) => {
  return new Promise(((resolve, reject) => {
    axios.post(Constants.URL_MS_1 + 'auth/login', {
      username,
      password
    })
      .then(((results) => results.data))
      .then((value) => resolve(value))
      .catch(e => reject(e))
  }));
}

export const register = (user: UserRegister) => {

  const userRequest: UserRequest = {
    id: uuidV4(),
    username: user.username,
    password: user.password,
  };

  return new Promise(((resolve, reject) => {
    axios.post(Constants.URL_MS_1 + 'user/register', userRequest)
      .then(((results) => results.data))
      .then((value) => resolve(value))
      .catch(e => reject(e))
  }));
}
