import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {applyMiddleware, compose, createStore} from 'redux';

import Reducer from './reducers';
import initialState from './initialState';

const isShowLogs = () => {
  const isServer = process.env.IS_SERVER_SIDE;

  if (isServer) return false;
  return process.env.NODE_ENV === 'development';
};

const loggerMiddleware = createLogger({
  predicate: () => isShowLogs(),
  timestamp: false,
  collapsed: true
});

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

function configureStore(state) {
  const enhancer = composeEnhancers(compose(applyMiddleware(thunkMiddleware, loggerMiddleware)));
  return createStore(Reducer, state, enhancer);
}

export let store = {
  getState: () => initialState,
  dispatch: () => {}
};

export default state => {
  const reduxStore = configureStore(state);
  store = reduxStore;
  return reduxStore;
};
