import User from '../pages/user';
import Users from '../pages/users';
import UserInfo from '../pages/userInfo';
import UserChangePassword from '../pages/userChangePassword';
import Coupon from '../pages/coupon';
import Coupons from '../pages/coupons';
import CouponType from '../pages/couponType';
import CouponTypes from '../pages/couponTypes';

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
};
