import initialState from '../initialState';

export const ADD_PAGES = 'ADD_PAGES';

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
