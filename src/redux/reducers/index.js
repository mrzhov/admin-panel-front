import {combineReducers} from 'redux';

import router from './router';
import user from './user';
import commonFlags from './commonFlags';
import pages from './pages';

export default combineReducers({
  user,
  router,
  commonFlags,
  pages
});
