import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import request from '../lib/request';
import { START_FETCHING, END_FETCHING } from "../redux/actions/commonFlags";
import { GET_USERS } from "../redux/actions/users";
import { runCallback } from "../lib/functions";

const failed = response => {
    alert(response.message);
};

class UsersApi {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    createUser = (body, cb) => {
        request('/users', {
            method: 'POST',
            body: JSON.stringify(body),
            success: runCallback(cb),
            failed
        });
    };

    getUsers = (query, cb) => {
        const success = response => {
            this.dispatch({ type: GET_USERS, response });
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

    getUser = (id, cb) => {
        request(`/users/${id}`, {
            success: response => runCallback(cb, response),
            failed
        });
    };

    updateUser = (body, id, cb) => {
        request(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            success: runCallback(cb),
            failed
        });
    };

    deleteUser = (id, cb) => {
        request(`/users/${id}`, {
            method: 'DELETE',
            success: runCallback(cb),
            failed
        });
    };

    changePassword = (body, cb) => {
        request('/users/change-password', {
            method: 'POST',
            body: JSON.stringify(body),
            success: runCallback(cb),
            failed
        });
    };
}

export default () => {
    const dispatch = useDispatch();
    return useMemo(() => new UsersApi(dispatch), []);
}

