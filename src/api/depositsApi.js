import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import request from '../lib/request';
import { GET_DEPOSITS } from "../redux/actionTypes/deposits";
import { END_FETCHING, START_FETCHING } from "../redux/actionTypes/commonFlags";
import { runCallback } from "../lib/functions";

const failed = response => {
    alert(response.message);
};

class DepositsApi {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    getDeposits = (query, cb) => {
        const success = response => {
            if (!query.hasOwnProperty('ownerId'))
                this.dispatch({ type: GET_DEPOSITS, response });
            this.dispatch({ type: END_FETCHING });
            runCallback(cb, response);
        };
        this.dispatch({ type: START_FETCHING });
        request('/deposits', {
            query,
            success,
            failed,
        });
    };

    createDeposit = (body, cb) => {
        request('/deposits', {
            body: JSON.stringify(body),
            method: 'POST',
            success: runCallback(cb),
            failed,
        });
    };

    getDeposit = (id, cb) => {
        request(`/deposits/${id}`, {
            success: runCallback(cb),
            failed
        });
    };

    updateDeposit = (body, id, cb) => {
        request(`/deposits/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            success: runCallback(cb),
            failed,
        });
    };

    deleteDeposit = (id, cb) => {
        request(`/deposits/${id}`, {
            method: 'DELETE',
            success: runCallback(cb),
            failed,
        });
    };
}

export default () => {
    const dispatch = useDispatch();
    return useMemo(() => new DepositsApi(dispatch), []);
}
