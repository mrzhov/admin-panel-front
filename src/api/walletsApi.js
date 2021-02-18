import {useDispatch} from 'react-redux';

import request from '../lib/request';
import { GET_WALLETS } from "../redux/actions/wallets";
import { END_FETCHING, START_FETCHING } from "../redux/actions/commonFlags";
import { runCallback } from "../lib/functions";
import { useMemo } from "react";

const failed = response => {
  alert(response.message);
};

class WalletsApi {
  constructor(dispatch) {
    this.dispatch = dispatch;
  }

  getWallets = (query, cb) => {
    const success = response => {
      this.dispatch({ type: GET_WALLETS, response });
      this.dispatch({ type: END_FETCHING });
      runCallback(cb);
    };
    this.dispatch({ type: START_FETCHING });
    request('/wallets', {
      query,
      success,
      failed,
    });
  };

  createWallet = (body, cb) => {
    request('/wallets', {
      body: JSON.stringify(body),
      method: 'POST',
      success: runCallback(cb),
      failed,
    });
  };

  getWallet = (id, cb) => {
    request(`/wallets/${id}`, {
      success: response => runCallback(cb, response),
      failed
    });
  };

  updateWallet = (body, id, cb) => {
    request(`/wallets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      success: runCallback(cb),
      failed,
    });
  };

  deleteWallet = (id, cb) => {
    request(`/wallets/${id}`, {
      method: 'DELETE',
      success: runCallback(cb),
      failed,
    });
  };
}

export default () => {
  const dispatch = useDispatch();
  return useMemo(() => new WalletsApi(dispatch), []);
}
