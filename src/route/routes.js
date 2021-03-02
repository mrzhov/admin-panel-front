import User from '../pages/user';
import Users from '../pages/users';
import UserInfo from '../pages/userInfo';
import UserChangePassword from '../pages/userChangePassword';
import Coupon from '../pages/coupon';
import Coupons from '../pages/coupons';
import CouponType from '../pages/couponType';
import CouponTypes from '../pages/couponTypes';
import Wallet from "../pages/wallet";
import Wallets from "../pages/wallets";
import Deposits from "../pages/deposits";
import Deposit from "../pages/deposit";
import Promotions from "../pages/promotions";
import Promo from "../pages/promo";

export default {
    userPage: {
        path: '/users/:id/edit',
        component: User
    },
    usersPage: {
        path: '/users',
        component: Users
    },
    userInfo: {
        path: '/users/:id',
        component: UserInfo
    },
    userChangePassword: {
        path: '/users/:id/change-password',
        component: UserChangePassword
    },

    couponPage: {
        path: '/coupons/:id',
        component: Coupon
    },
    coupons: {
        path: '/coupons',
        component: Coupons
    },
    couponTypePage: {
        path: '/coupon-types/:id',
        component: CouponType
    },
    couponTypesPage: {
        path: '/coupon-types',
        component: CouponTypes
    },

    walletPage: {
        path: '/wallets/:id',
        component: Wallet
    },
    walletsPage: {
        path: '/wallets',
        component: Wallets
    },

    depositPage: {
        path: '/deposits/:id',
        component: Deposit
    },
    depositsPage: {
        path: '/deposits',
        component: Deposits
    },

    promoPage: {
        path: '/promo/:id',
        component: Promo
    },
    promotionsPage: {
        path: '/promo',
        component: Promotions
    },
};
