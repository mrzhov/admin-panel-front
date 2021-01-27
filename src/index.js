import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { BrowserRouter, Route } from 'react-router-dom';

import createStore from './redux/createStore';

import App from './app/app';

import './scss/index.scss';

const store = createStore();

const Root = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Route
          component={App}
          path='/'
      />
    </Provider>
  </BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById('app'));
