import {useMemo} from 'react';
import {useDispatch} from 'react-redux';

import request from '../lib/request';
import { GET_WALLETS } from "../redux/actions/wallets";
import { END_FETCHING, START_FETCHING } from "../redux/actions/commonFlags";

const failed = response => {
  alert(response.message);
};

class WalletsApi {
  dispatch;

  constructor(dispatch) {
    this.dispatch = dispatch;
  }

  getWallets = (query, cb) => {
    const success = response => {
      this.dispatch({
        type: GET_WALLETS,
        response
      });

      this.dispatch({
        type: END_FETCHING
      });

      if (cb && typeof cb === 'function') cb();
    };

    this.dispatch({
      type: START_FETCHING
    });

    request('/wallets', {
      query,
      success,
      failed,
    });
  };

  createWallet = (body, cb) => {
    const success = () => {
      if (cb && typeof cb === 'function') cb();
    };

    request('/wallets', {
      body: JSON.stringify(body),
      method: 'POST',
      success,
      failed,
    });
  };

  getWallet = (id, cb) => {
    const success = response => {
      if (cb && typeof cb === 'function') cb(response);
    };

    request(`/wallets/${id}`, {
      success,
      failed
    });
  };

  updateWallet = (body, id, cb) => {
    const success = () => {
      if (cb && typeof cb === 'function') cb();
    };

    request(`/wallets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      success,
      failed,
    });
  };

  deleteWallet = (id, cb) => {
    const success = () => {
      if (cb && typeof cb === 'function') cb();
    };

    request(`/wallets/${id}`, {
      method: 'DELETE',
      success,
      failed,
    });
  };
}

export default function useWallets() {
  const dispatch = useDispatch();

  return useMemo(() => new WalletsApi(dispatch), []);
}
