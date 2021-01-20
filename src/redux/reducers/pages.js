import initialState from '../initialState';
import {ADD_PAGES} from "../actions/pages";

export default function (state = initialState.pages, action) {
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
