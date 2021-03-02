import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import request from '../lib/request';
import { END_FETCHING, START_FETCHING } from "../redux/actionTypes/commonFlags";
import { runCallback } from "../lib/functions";
import { GET_PROMOTIONS } from "../redux/actionTypes/promotions";

const failed = response => {
    alert(response.message);
};

class PromotionsApi {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    getPromotions = (query, cb) => {
        const success = response => {
            this.dispatch({ type: GET_PROMOTIONS, response });
            this.dispatch({ type: END_FETCHING });
            runCallback(cb);
        };
        this.dispatch({ type: START_FETCHING });
        request('/promotions', {
            query,
            success,
            failed
        });
    };

    createPromo = (body, cb) => {
        request('/promotions', {
            body: JSON.stringify(body),
            method: 'POST',
            success: () => runCallback(cb),
            failed,
        });
    };

    getPromo = (id, cb) => {
        request(`/promotions/${id}`, {
            success: response => runCallback(cb(response)),
            failed
        });
    };

    updatePromo = (body, id, cb) => {
        request(`/promotions/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            success: () => runCallback(cb),
            failed,
        });
    };

    deletePromo = (id, cb) => {
        request(`/promotions/${id}`, {
            method: 'DELETE',
            success: () => runCallback(cb),
            failed,
        });
    };
}

export default () => {
    const dispatch = useDispatch();
    return useMemo(() => new PromotionsApi(dispatch), []);
}
