import {useMemo} from 'react';
import {useDispatch} from 'react-redux';

import request from "../lib/request";
import {getPages} from "../lib/functions";
import {CLOSE_RESTORE_PASSWORD} from "../redux/actions/commonFlags";
import {LOGIN, LOGOUT} from "../redux/actions/user";
import {ADD_PAGES} from "../redux/actions/pages";

const failed = response => {
    alert(response.message);
};

class UserApi {
    dispatch;

    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    checkEmail = (body, cb) => {
        const success = response => {
            if (response.data.success) {
                if (cb && typeof cb === 'function') cb();
            }
        };

        request('/users/check_email', {
            method: 'POST',
            body: JSON.stringify(body),
            success,
            failed
        });
    };

    checkResetKey = (body, cb) => {
        const success = response => {
            if (response.data.success) {
                if (cb && typeof cb === 'function') cb();
            }
        };

        request('/users/check_reset_key', {
            method: 'POST',
            body: JSON.stringify(body),
            success,
            failed
        });
    };

    resetPassword = (body, cb) => {
        const success = response => {
            if (response.data.success) {
                this.dispatch({
                    type: CLOSE_RESTORE_PASSWORD
                });
                if (cb && typeof cb === 'function') cb();
            }
        };

        request('/users/reset_password', {
            method: 'POST',
            body: JSON.stringify(body),
            success,
            failed
        });
    };
}

export default function useUserApi() {
    const dispatch = useDispatch();

    return useMemo(() => new UserApi(dispatch), []);
}

export const login = (data, cb) => {
    return async dispatch => {
        const success = response => {
            if (cb && typeof cb === 'function') cb();
            dispatch({
                type: LOGIN,
                response
            });
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
}

export const logout = () => {
    return dispatch => {
        dispatch({
            type: LOGOUT
        });
    }
}
