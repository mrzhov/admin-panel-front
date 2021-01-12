import {setLocalStorage} from '../../lib/functions';
import initialState from '../initialState';

export default function (state = initialState.user, action) {
  // console.log('login', state, action.type, action.response);
  switch (action.type) {
    // case LOGIN:
    //   setLocalStorage(X5_USER_TOKEN, action.response.data.accessToken);
    //   setLocalStorage(X5_USER_ID, action.response.data.userId);
    //   setLocalStorage(X5_USER_ROLE, action.response.data.role);
    //   setLocalStorage(X5_USER_IS_SUPER, action.response.data.isSuper);
    //   return {
    //     ...state,
    //     token: action.response.data.accessToken || state.token,
    //     id: action.response.data.userId,
    //     role: action.response.data.role || state.role,
    //     info: action.response.data,
    //     isSuper: action.response.data.isSuper
    //   };
    // case LOGOUT:
    //   setLocalStorage(X5_USER_TOKEN, '');
    //   setLocalStorage(X5_USER_ROLE, '');
    //   setLocalStorage(X5_USER_IS_SUPER, '');
    //   setLocalStorage(X5_USER_ID, '');
    //   return {
    //     ...state,
    //     token: '',
    //     id: '',
    //     role: '',
    //     isSuper: false
    //   };

    default:
      return state;
  }
}
