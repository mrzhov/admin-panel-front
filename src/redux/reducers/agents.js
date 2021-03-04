import { GET_AGENTS } from '../actionTypes/agents';
import initialState from '../initialState';

export default (state = initialState.agents, action) => {
    switch (action.type) {
        case GET_AGENTS:
            return {
                ...state,
                list: action.response.data,
                totalAmount: action.response.totalAmount,
            };

        default:
            return state;
    }
}
