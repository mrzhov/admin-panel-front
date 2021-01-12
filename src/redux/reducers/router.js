import { SET_LOCATION } from '../../api/router';
import initialState from '../initialState';

export default function(state = initialState.router, action) {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        location: action.response.current,
        prevLocation: action.response.prev
      };

    default:
      return state;
  }
}
