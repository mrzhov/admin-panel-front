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
        path: '/admin/users/:id/edit',
        component: User
    },
    usersPage: {
        path: '/admin/users',
        component: Users
    },
    userInfo: {
        path: '/admin/users/:id',
        component: UserInfo
    },
    userChangePassword: {
        path: '/admin/users/:id/change-password',
        component: UserChangePassword
    },

    couponPage: {
        path: '/admin/coupons/:id',
        component: Coupon
    },
    coupons: {
        path: '/admin/coupons',
        component: Coupons
    },
    couponTypePage: {
        path: '/admin/coupon-types/:id',
        component: CouponType
    },
    couponTypesPage: {
        path: '/admin/coupon-types',
        component: CouponTypes
    },
};
