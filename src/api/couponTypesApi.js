import {useMemo} from 'react';
import {useDispatch} from 'react-redux';

import request from '../lib/request';
import {START_FETCHING, END_FETCHING} from "../redux/actions/commonFlags";
import {GET_COUPON_TYPES} from "../redux/actions/couponTypes";

const failed = response => {
    alert(response.message);
};

class CouponTypesApi {
    dispatch;

    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    getCouponTypes = (query, cb) => {
        const success = response => {
            this.dispatch({
                type: GET_COUPON_TYPES,
                response
            });

            this.dispatch({
                type: END_FETCHING
            });

            if (cb && typeof cb === 'function') cb();
        };

        this.dispatch({
            type: START_FETCHING
        });

        request('/coupon-types', {
            query,
            success,
            failed
        });
    };

    createCouponType = (body, cb) => {
        const success = () => {
            if (cb && typeof cb === 'function') cb();
        };

        request('/coupon-types', {
            method: 'POST',
            body: JSON.stringify(body),
            success,
            failed
        });
    };

    getCouponType = (id, cb) => {
        const success = response => {
            if (cb && typeof cb === 'function') cb(response);
        };

        request(`/coupon-types/${id}`, {
            success,
            failed
        });
    };

    updateCouponType = (body, id, cb) => {
        const success = () => {
            if (cb && typeof cb === 'function') cb();
        };

        request(`/coupon-types/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            success,
            failed
        });
    };

    deleteCouponType = (id, cb) => {
        const success = () => {
            if (cb && typeof cb === 'function') cb();
        };

        request(`/coupon-types/${id}`, {
            method: 'DELETE',
            success,
            failed
        });
    };
}

export default function useCouponTypes() {
    const dispatch = useDispatch();

    return useMemo(() => new CouponTypesApi(dispatch), []);
}
