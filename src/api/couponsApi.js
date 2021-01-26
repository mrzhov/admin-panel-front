import {useMemo} from 'react';
import {useDispatch} from 'react-redux';

import request from '../lib/request';
import {START_FETCHING, END_FETCHING} from "../redux/actions/commonFlags";
import {CLEAR_CURRENT_GENERATED_COUPONS, CREATE_COUPON, GET_COUPONS} from "../redux/actions/coupons";

const failed = response => {
    alert(response.message);
};

class CouponsApi {
    dispatch;

    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    createCoupon = (body, cb) => {
        const success = response => {
            this.dispatch({
                type: CREATE_COUPON,
                response
            });

            if (cb && typeof cb === 'function') cb();
        };

        request('/coupons', {
            body: JSON.stringify(body),
            method: 'POST',
            success,
            failed,
        });
    };

    getCoupons = (query, cb) => {
        const success = response => {
            if (!query.hasOwnProperty('isActivated')) {
                this.dispatch({
                    type: GET_COUPONS,
                    response
                });
            }
            this.dispatch({
                type: END_FETCHING
            });
            if (cb && typeof cb === 'function') cb(response);
        };

        this.dispatch({
            type: START_FETCHING
        });

        request('/coupons', {
            query,
            success,
            failed,
        });
    };

    getCoupon = (id, cb) => {
        const success = response => {
            if (cb && typeof cb === 'function') cb(response);
        };

        request(`/coupons/${id}`, {
            success,
            failed,
        });
    };

    updateCoupon = (body, id, cb) => {
        const success = () => {
            if (cb && typeof cb === 'function') cb();
        };

        request(`/coupons/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            success,
            failed,
        });
    };

    deleteCoupon = (id, cb) => {
        const success = () => {
            if (cb && typeof cb === 'function') cb();
        };

        request(`/coupons/${id}`, {
            method: 'DELETE',
            success,
            failed,
        });
    };

    clearCurrentGeneratedCoupons = () => {
        this.dispatch({
            type: CLEAR_CURRENT_GENERATED_COUPONS
        });
    };
}

export default function useCoupons() {
    const dispatch = useDispatch();

    return useMemo(() => new CouponsApi(dispatch), []);
}
