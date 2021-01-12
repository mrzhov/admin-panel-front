import initialState from '../initialState';

export const START_FETCHING = 'START_FETCHING';
export const END_FETCHING = 'END_FETCHING';
export const OPEN_RESTORE_PASSWORD = 'OPEN_RESTORE_PASSWORD';
export const CLOSE_RESTORE_PASSWORD = 'CLOSE_RESTORE_PASSWORD';

export default function (state = initialState.commonFlags, action) {
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

        default:
            return state;
    }
}
