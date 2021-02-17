import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import request from '../lib/request';
import { GET_DEPOSITS } from "../redux/actions/deposits";
import { END_FETCHING, START_FETCHING } from "../redux/actions/commonFlags";
import { cbSuccessRequest } from "../lib/functions";

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
            cbSuccessRequest(cb);
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
            success: cbSuccessRequest(cb),
            failed,
        });
    };

    getDeposit = (id, cb) => {
        request(`/deposits/${id}`, {
            success: cbSuccessRequest(cb),
            failed
        });
    };

    updateDeposit = (body, id, cb) => {
        request(`/deposits/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            success: cbSuccessRequest(cb),
            failed,
        });
    };

    deleteDeposit = (id, cb) => {
        request(`/deposits/${id}`, {
            method: 'DELETE',
            success: cbSuccessRequest(cb),
            failed,
        });
    };
}

export default () => {
    const dispatch = useDispatch();
    return useMemo(() => new DepositsApi(dispatch), []);
}
