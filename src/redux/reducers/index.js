import {combineReducers} from 'redux';

import commonFlags from './commonFlags';
import pages from './pages';
import user from './user';
import agents from './agents';
import couponTypes from './couponTypes';
import coupons from './coupons';
import wallets from "./wallets";
import deposits from './deposits';
import promotions from './promotions';

export default combineReducers({
  commonFlags,
  pages,
  user,
  agents,
  couponTypes,
  coupons,
  wallets,
  deposits,
  promotions
});
