import {useMemo} from 'react';
import {useDispatch} from 'react-redux';

import request from '../lib/request';

import {store} from '../redux/createStore';
import {CLOSE_RESTORE_PASSWORD, END_FETCHING, START_FETCHING} from "../redux/actions/commonFlags";
import {
    CREATE_USER,
    DELETE_USER,
    GET_CONFIRMED_USERS,
    GET_USER,
    GET_USER_PAGES,
    GET_USERS,
    UPDATE_USER
} from "../redux/actions/users";

const failed = response => {
    alert(response.message);
};

class UsersApi {

    dispatch;

    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    checkEmail = (body, cb) => {
        const success = response => {
            if (response.data.success) {
                if (cb) cb();
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
                if (cb) cb();
            }
        };

        request('/users/check-reset-key', {
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
                if (cb) cb();
            }
        };

        request('/users/reset-password', {
            method: 'POST',
            body: JSON.stringify(body),
            success,
            failed
        });
    };

    createUser = (body, cb) => {
        const success = () => {
            this.dispatch({
                type: CREATE_USER
            });

            if (cb) cb();
        };

        request('/users', {
            method: 'POST',
            body: JSON.stringify(body),
            success,
            failed
        });
    };

    getUsers = (query, cb) => {
        const success = response => {
            this.dispatch({
                type: GET_USERS,
                response
            });

            this.dispatch({
                type: END_FETCHING
            });

            if (cb) cb();
        };

        this.dispatch({
            type: START_FETCHING
        });

        request('/users/list', {
            success,
            query
        });
    }

    getUser = (id, cb) => {
        const success = response => {
            this.dispatch({type: GET_USER});

            const ownerName = response.owner.name;
            const data = response;
            data.ownerName = ownerName;
            if (cb) cb(data);
        };

        request(`/users/${id}`, {success});
    };

    getUserPages = (cb) => {
        const success = response => {
            this.dispatch({type: GET_USER_PAGES});

            if (cb) cb(response);
        };

        request('/users/pages', {success});
    };

    updateUser = (body, id, cb) => {
        const success = () => {
            this.dispatch({type: UPDATE_USER});

            if (cb) cb();
        };

        request(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            success
        });
    };

    deleteUser = (id, cb) => {
        const success = () => {
            this.dispatch({type: DELETE_USER})

            if (cb) cb();
        };

        request(`/users/${id}`, {
            method: 'DELETE',
            success
        });
    };

    changePassword = (body, cb) => {
        const success = () => {
            if (cb) cb();
        };

        request('/users/change-password', {
            method: 'POST',
            body: JSON.stringify(body),
            success,
            failed
        });
    };

    static async getConfirmedUsers(timetableId, eventId) {
        const success = (response) => {
            store.dispatch({
                type: GET_CONFIRMED_USERS,
                response
            });
        };

        await request(`/timetables/${timetableId}/events/${eventId}/confirmed_users`, {success});
    }
}

export default function useUsers() {
    const dispatch = useDispatch();

    return useMemo(() => new UsersApi(dispatch), []);
}
