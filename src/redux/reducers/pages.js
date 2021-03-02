import initialState from '../initialState';
import {ADD_PAGES} from "../actionTypes/pages";

export default (state = initialState.pages, action) => {
    switch (action.type) {
        case ADD_PAGES:
            return {
                ...state,
                list: action.pagesList
            };

        default:
            return state;
    }
}
