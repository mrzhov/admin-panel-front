import {setLocalStorage} from '../../lib/functions';
import initialState from '../initialState';
import {LOGIN, LOGOUT} from "../actionTypes/user";
import {USER_ID, USER_IS_SUPER, USER_ROLE, USER_TOKEN} from "../../lib/_variables";

export default (state = initialState.authUser, action) => {
  switch (action.type) {
    case LOGIN:
      setLocalStorage(USER_TOKEN, action.response.data.accessToken);
      setLocalStorage(USER_ID, action.response.data.id);
      setLocalStorage(USER_ROLE, action.response.data.role);
      setLocalStorage(USER_IS_SUPER, action.response.data.isSuper);
      return {
        ...state,
        accessToken: action.response.data.accessToken,
        id: action.response.data.id,
        role: action.response.data.role,
        isSuper: action.response.data.isSuper
      };
    case LOGOUT:
      setLocalStorage(USER_TOKEN, '');
      setLocalStorage(USER_ID, '');
      setLocalStorage(USER_ROLE, '');
      setLocalStorage(USER_IS_SUPER, '');
      return {
        ...state,
        accessToken: '',
        id: '',
        role: '',
        isSuper: false
      };

    default:
      return state;
  }
}
