import { UserActionTypes } from './user.types';
import { UserState } from './user-state.interface';

const INITIAL_STATE: UserState = {
  // @ts-ignore
  currentUser: null,
}

const userReducer = (state: UserState = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case UserActionTypes.FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;
