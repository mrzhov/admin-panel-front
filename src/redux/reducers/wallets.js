import initialState from '../initialState';
import { GET_WALLETS } from "../actionTypes/wallets";

export default (state = initialState.wallets, action) => {
  switch (action.type) {
    case GET_WALLETS:
      return {
        ...state,
        list: action.response.data,
        totalAmount: action.response.totalAmount
      };

    default:
      return state;
  }
}
