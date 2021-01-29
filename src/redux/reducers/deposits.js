import initialState from '../initialState';
import { GET_DEPOSITS } from "../actions/deposits";

export default (state = initialState.deposits, action) => {
  switch (action.type) {
    case GET_DEPOSITS:
      return {
        ...state,
        list: action.response.data,
        totalAmount: action.response.totalAmount
      };

    default:
      return state;
  }
}
