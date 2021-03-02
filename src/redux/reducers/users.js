import {GET_USERS} from '../actionTypes/users';
import initialState from '../initialState';

export default (state = initialState.users, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        list: action.response.data,
        totalAmount: action.response.totalAmount,
      };

    default:
      return state;
  }
}
