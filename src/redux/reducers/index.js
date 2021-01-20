import {combineReducers} from 'redux';

import router from './router';
import authUser from './authUser';
import commonFlags from './commonFlags';
import pages from './pages';

export default combineReducers({
  authUser,
  router,
  commonFlags,
  pages
});
