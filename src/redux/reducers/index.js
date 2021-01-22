import {combineReducers} from 'redux';

import router from './router';
import commonFlags from './commonFlags';
import pages from './pages';
import authUser from './authUser';
import users from './users';
import couponTypes from './couponTypes';
import coupons from './coupons';

export default combineReducers({
  router,
  commonFlags,
  pages,
  authUser,
  users,
  couponTypes,
  coupons
});
