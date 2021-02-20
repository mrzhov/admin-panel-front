import { useDispatch } from 'react-redux';

import request from '../lib/request';
import { START_FETCHING, END_FETCHING } from "../redux/actions/commonFlags";
import { GET_COUPON_TYPES } from "../redux/actions/couponTypes";
import { runCallback } from "../lib/functions";
import { useMemo } from "react";

const failed = response => {
    alert(response.message);
};

class CouponTypesApi {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    getCouponTypes = (query, cb) => {
        const success = response => {
            this.dispatch({ type: GET_COUPON_TYPES, response });
            this.dispatch({ type: END_FETCHING });
            runCallback(cb);
        };
        this.dispatch({ type: START_FETCHING });
        request('/coupon-types', {
            query,
            success,
            failed
        });
    };

    createCouponType = (body, cb) => {
        request('/coupon-types', {
            method: 'POST',
            body: JSON.stringify(body),
            success: () => runCallback(cb),
            failed
        });
    };

    getCouponType = (id, cb) => {
        request(`/coupon-types/${id}`, {
            success: response => runCallback(cb(response)),
            failed
        });
    };

    updateCouponType = (body, id, cb) => {
        request(`/coupon-types/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            success: () => runCallback(cb),
            failed
        });
    };

    deleteCouponType = (id, cb) => {
        request(`/coupon-types/${id}`, {
            method: 'DELETE',
            success: () => runCallback(cb),
            failed
        });
    };
}

export default () => {
    const dispatch = useDispatch();
    return useMemo(() => new CouponTypesApi(dispatch), []);
}
