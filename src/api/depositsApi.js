import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import request from '../lib/request';
import { GET_DEPOSITS } from "../redux/actions/deposits";
import { END_FETCHING, START_FETCHING } from "../redux/actions/commonFlags";
import { GET_COUPONS } from "../redux/actions/coupons";

const failed = response => {
    alert(response.message);
};

class DepositsApi {
    dispatch;

    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    getDeposits = (query, cb) => {
        const success = response => {
            if (!query.hasOwnProperty('ownerId')) {
                this.dispatch({
                    type: GET_DEPOSITS,
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

        request('/deposits', {
            query,
            success,
            failed,
        });
    };

    createDeposit = (body, cb) => {
        const success = () => {
            if (cb && typeof cb === 'function') cb();
        };

        request('/deposits', {
            body: JSON.stringify(body),
            method: 'POST',
            success,
            failed,
        });
    };

    getDeposit = (id, cb) => {
        const success = response => {
            if (cb && typeof cb === 'function') cb(response);
        };

        request(`/deposits/${id}`, {
          success,
          failed
        });
    };

    updateDeposit = (body, id, cb) => {
        const success = () => {
            if (cb && typeof cb === 'function') cb();
        };

        request(`/deposits/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            success,
            failed,
        });
    };

    deleteDeposit = (id, cb) => {
        const success = () => {
            if (cb && typeof cb === 'function') cb();
        };

        request(`/deposits/${id}`, {
            method: 'DELETE',
            success,
            failed,
        });
    };
}

export default function useDeposits() {
    const dispatch = useDispatch();

    return useMemo(() => new DepositsApi(dispatch), []);
}
