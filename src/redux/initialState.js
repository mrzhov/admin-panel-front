import {getLocalStorage, getPages} from '../lib/functions';
import {USER_ID, USER_IS_SUPER, USER_ROLE, USER_TOKEN} from "../lib/_variables";

const initialState = {
  commonFlags: {
    isFetching: false,
    restorePassword: false,
    sortConfig: {
      sortField: '',
      sortDirection: ''
    }
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
  users: {
    list: [],
    totalAmount: 0,
  },
  couponTypes: {
    list: [],
    totalAmount: 0,
  },
  coupons: {
    list: [],
    totalAmount: 0,
  },
  wallets: {
    list: [],
    totalAmount: 0,
  },
  deposits: {
    list: [],
    totalAmount: 0
  },
  promotions: {
    list: [],
    totalAmount: 0,
  },
};

export default initialState;
