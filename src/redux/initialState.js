import {getLocalStorage, getPages} from '../lib/functions';
import {USER_ID, USER_IS_SUPER, USER_ROLE, USER_TOKEN} from "../lib/_variables";

const initialState = {
  commonFlags: {
    isFetching: false,
    restorePassword: false
  },
  pages: {
    list: getPages(getLocalStorage(USER_ROLE), getLocalStorage(USER_IS_SUPER)) || []
  },
  router: {
    location: null,
    prevLocation: null
  },
  authUser: {
    accessToken: getLocalStorage(USER_TOKEN) || '',
    id: getLocalStorage(USER_ID) || '',
    role: getLocalStorage(USER_ROLE) || '',
    isSuper: getLocalStorage(USER_IS_SUPER) || false
  },
};

export default initialState;
