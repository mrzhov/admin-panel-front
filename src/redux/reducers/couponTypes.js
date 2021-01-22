import {GET_COUPON_TYPES} from '../actions/couponTypes';
import initialState from '../initialState';

export default function(state = initialState.couponTypes, action) {
  switch (action.type) {
    case GET_COUPON_TYPES:
      return {
        ...state,
        list: action.response.data,
        totalAmount: action.response.totalAmount
      };

    default:
      return state;
  }
}
