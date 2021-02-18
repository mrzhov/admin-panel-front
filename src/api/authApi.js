import { useDispatch } from 'react-redux';

import request from "../lib/request";
import { getPages, runCallback } from "../lib/functions";
import { CLOSE_RESTORE_PASSWORD } from "../redux/actions/commonFlags";
import { LOGIN, LOGOUT } from "../redux/actions/user";
import { ADD_PAGES } from "../redux/actions/pages";
import { useMemo } from "react";

const failed = response => {
    alert(response.message);
};

class AuthApi {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    checkEmail = (body, cb) => {
        request('/users/check-email', {
            method: 'POST',
            body: JSON.stringify(body),
            success: response => response.data.success && runCallback(cb),
            failed
        });
    };

    checkResetKey = (body, cb) => {
        request('/users/check-reset-key', {
            method: 'POST',
            body: JSON.stringify(body),
            success: response => response.data.success && runCallback(cb),
            failed
        });
    };

    resetPassword = (body, cb) => {
        const success = response => {
            if (response.data.success) {
                this.dispatch({ type: CLOSE_RESTORE_PASSWORD });
                runCallback(cb);
            }
        };

        request('/users/reset-password', {
            method: 'POST',
            body: JSON.stringify(body),
            success,
            failed
        });
    };
}

export default () => {
    const dispatch = useDispatch();
    return useMemo(() => new AuthApi(dispatch), []);
}

export const login = (data, cb) => dispatch => {
    const success = response => {
        runCallback(cb);
        dispatch({type: LOGIN, response});
        dispatch({
            type: ADD_PAGES,
            pagesList: getPages(response.data.role, response.data.isSuper)
        });
    };

    request('/users/login', {
        method: 'POST',
        body: JSON.stringify(data),
        success,
        failed
    });
}
export const logout = () => dispatch => { dispatch({ type: LOGOUT }); }
