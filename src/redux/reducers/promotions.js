import initialState from '../initialState';
import { GET_PROMOTIONS } from "../actionTypes/promotions";

export default function (state = initialState.promotions, action) {
    switch (action.type) {
        case GET_PROMOTIONS:
            return {
                ...state,
                list: action.response.data,
                totalAmount: action.response.totalAmount
            };

        default:
            return state;
    }
}
