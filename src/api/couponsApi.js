import { useDispatch } from 'react-redux';

import request from '../lib/request';
import { START_FETCHING, END_FETCHING } from "../redux/actions/commonFlags";
import { GET_COUPONS } from "../redux/actions/coupons";
import { runCallback } from "../lib/functions";
import { useMemo } from "react";

const failed = response => {
    alert(response.message);
};

class CouponsApi {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    createCoupon = (body, cb) => {
        request('/coupons', {
            body: JSON.stringify(body),
            method: 'POST',
            success: response => runCallback(cb, response),
            failed,
        });
    };

    getCoupons = (query, cb) => {
        const success = response => {
            if (!query.hasOwnProperty('isActivated'))
                this.dispatch({ type: GET_COUPONS, response });
            this.dispatch({ type: END_FETCHING });
            runCallback(cb, response);
        };
        this.dispatch({ type: START_FETCHING });
        request('/coupons', {
            query,
            success,
            failed,
        });
    };

    getCoupon = (id, cb) => {
        request(`/coupons/${id}`, {
            success: response => runCallback(cb, response),
            failed,
        });
    };

    updateCoupon = (body, id, cb) => {
        request(`/coupons/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            success: runCallback(cb),
            failed,
        });
    };

    deleteCoupon = (id, cb) => {
        request(`/coupons/${id}`, {
            method: 'DELETE',
            success: runCallback(cb),
            failed,
        });
    };
}

export default () => {
    const dispatch = useDispatch();
    return useMemo(() => new CouponsApi(dispatch), []);
}
