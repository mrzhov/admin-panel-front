import Agent from '../pages/agent';
import Agents from '../pages/agents';
import AgentInfo from '../pages/agentInfo';
import ChangePassword from '../pages/changePassword';
import Coupon from '../pages/coupon';
import Coupons from '../pages/coupons';
import CouponType from '../pages/couponType';
import CouponTypes from '../pages/couponTypes';
import Wallet from "../pages/wallet";
import Wallets from "../pages/wallets";
import Deposits from "../pages/deposits";
import Deposit from "../pages/deposit";
import Promotions from "../pages/promotions";
import Promotion from "../pages/promotion";

export default {
    agentPage: {
        path: '/agents/:id/edit',
        component: Agent
    },
    agentsPage: {
        path: '/agents',
        component: Agents
    },
    agentInfoPage: {
        path: '/agents/:id',
        component: AgentInfo
    },
    changePasswordPage: {
        path: '/agents/:id/change-password',
        component: ChangePassword
    },

    couponPage: {
        path: '/coupons/:id',
        component: Coupon
    },
    couponsPage: {
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

    promotionPage: {
        path: '/promo/:id',
        component: Promotion
    },
    promotionsPage: {
        path: '/promo',
        component: Promotions
    },
};
