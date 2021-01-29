import {
    CLEAR_CURRENT_GENERATED_COUPONS,
    CREATE_COUPON,
    GET_COUPONS,
} from '../actions/coupons';
import initialState from '../initialState';

export default (state = initialState.coupons, action) => {
    switch (action.type) {
        case GET_COUPONS:
            return {
                ...state,
                list: action.response.data,
                totalAmount: action.response.totalAmount
            };
        // case CREATE_COUPON:
        //     return {
        //         ...state,
        //         currentGeneratedCoupons: action.response,
        //         list: [...state.list.concat(action.response)]
        //     }
        // case CLEAR_CURRENT_GENERATED_COUPONS:
        //     return {
        //         ...state,
        //         currentGeneratedCoupons: []
        //     }
        default:
            return state;
    }
}
