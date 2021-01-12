import { store } from '../redux/createStore';

export const SET_LOCATION = 'SET_LOCATION';

class RouteController {
  static set(prev, current) {
    store.dispatch({
      type: SET_LOCATION,
      response: {
        prev,
        current
      }
    });
  }
}

export default RouteController;
