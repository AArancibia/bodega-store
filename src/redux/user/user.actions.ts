import { UserActionTypes } from './user.types';
import { User } from '../../interfaces/User';

export const fetchLoginStart = ({username, password}: {username: string, password: string}) => ({
  type: UserActionTypes.FETCH_LOGIN_START,
  payload: {username, password},
})

export const fetchLoginSuccess = (user: User) => ({
  type: UserActionTypes.FETCH_LOGIN_SUCCESS,
  payload: user,
})

export const fetchLoginFailed = (errorMessage: string) => ({
  type: UserActionTypes.FETCH_LOGIN_FAILED,
  payload: errorMessage,
})
