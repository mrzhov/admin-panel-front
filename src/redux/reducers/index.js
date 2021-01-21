import {combineReducers} from 'redux';

import router from './router';
import commonFlags from './commonFlags';
import pages from './pages';
import authUser from './authUser';
import users from './users';

export default combineReducers({
  router,
  commonFlags,
  pages,
  authUser,
  users,
});
