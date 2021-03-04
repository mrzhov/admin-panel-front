import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import request from '../lib/request';
import { START_FETCHING, END_FETCHING } from "../redux/actionTypes/commonFlags";
import { GET_AGENTS } from "../redux/actionTypes/agents";
import { runCallback } from "../lib/functions";

const failed = response => {
    alert(response.message);
};

class AgentsApi {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    createAgent = (body, cb) => {
        request('/users', {
            method: 'POST',
            body: JSON.stringify(body),
            success: () => runCallback(cb),
            failed
        });
    };

    getAgents = (query, cb) => {
        const success = response => {
            this.dispatch({ type: GET_AGENTS, response });
            this.dispatch({ type: END_FETCHING });
            runCallback(cb);
        };
        this.dispatch({ type: START_FETCHING });
        request('/users/list', {
            query,
            success,
            failed
        });
    }

    getAgent = (id, cb, failed) => {
        request(`/users/${id}`, {
            success: response => runCallback(cb, response),
            failed: () => runCallback(failed)
        });
    };

    updateAgent = (body, id, cb) => {
        request(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            success: () => runCallback(cb),
            failed
        });
    };

    deleteAgent = (id, cb) => {
        request(`/users/${id}`, {
            method: 'DELETE',
            success: () => runCallback(cb),
            failed
        });
    };
}

export default () => {
    const dispatch = useDispatch();
    return useMemo(() => new AgentsApi(dispatch), []);
}

