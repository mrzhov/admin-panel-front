import { useMemo } from "react";
import { useDispatch } from 'react-redux';
import request from "../lib/request";
import { getPages, runCallback } from "../lib/functions";
import { CLOSE_RESTORE_PASSWORD, OPEN_RESTORE_PASSWORD } from "../redux/actionTypes/commonFlags";
import { LOGIN, LOGOUT } from "../redux/actionTypes/user";
import { ADD_PAGES } from "../redux/actionTypes/pages";

const failed = response => {
    alert(response.message);
};

class UserApi {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    login = (data, cb) => {
        const success = response => {
            this.dispatch({ type: LOGIN, response });
            this.dispatch({ type: ADD_PAGES, pagesList: getPages(response.data.role, response.data.isSuper) });
            runCallback(cb);
        };

        request('/users/login', {
            method: 'POST',
            body: JSON.stringify(data),
            success,
            failed
        });
    }

    logout = () => this.dispatch({ type: LOGOUT })
    openRestorePasswordPage = () => this.dispatch({ type: OPEN_RESTORE_PASSWORD })
    openAuthorizationPage = () => this.dispatch({ type: CLOSE_RESTORE_PASSWORD })

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

    changePassword = (body, cb) => {
        request('/users/change-password', {
            method: 'POST',
            body: JSON.stringify(body),
            success: () => runCallback(cb),
            failed
        });
    };
}

export default () => {
    const dispatch = useDispatch();
    return useMemo(() => new UserApi(dispatch), []);
}
