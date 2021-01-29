import initialState from '../initialState';
import {CLOSE_RESTORE_PASSWORD, END_FETCHING, OPEN_RESTORE_PASSWORD, START_FETCHING, SET_SORT_CONFIG} from "../actions/commonFlags";

export default (state = initialState.commonFlags, action) => {
    switch (action.type) {
        case START_FETCHING:
            return {
                ...state,
                isFetching: true
            };
        case END_FETCHING:
            return {
                ...state,
                isFetching: false
            };
        case OPEN_RESTORE_PASSWORD:
            return {
                ...state,
                restorePassword: true
            };
        case CLOSE_RESTORE_PASSWORD:
            return {
                ...state,
                restorePassword: false
            };
        case SET_SORT_CONFIG:
            return {
                ...state,
                sortConfig: action.sortConfig
            };

        default:
            return state;
    }
}
