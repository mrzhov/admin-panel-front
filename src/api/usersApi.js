import {useMemo} from 'react';
import {useDispatch} from 'react-redux';

import request from '../lib/request';

import { store } from '../redux/createStore';
import { END_FETCHING, START_FETCHING } from "../redux/actions/commonFlags";
import { GET_USERS } from "../redux/actions/users";

const failed = response => {
    alert(response.message);
};

class UsersApi {
    dispatch;

    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    createUser = (body, cb) => {
        const success = () => {
            if (cb && typeof cb === 'function') cb();
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

            if (cb && typeof cb === 'function') cb();
        };

        this.dispatch({
            type: START_FETCHING
        });

        request('/users/list', {
            query,
            success,
            failed
        });
    }

    getUser = (id, cb) => {
        const success = response => {
            const ownerName = response.owner.name;
            const data = response;
            data.ownerName = ownerName;
            if (cb && typeof cb === 'function') cb(data);
        };

        request(`/users/${id}`, {success});
    };

    getUserPages = (cb) => {
        const success = response => {
            if (cb && typeof cb === 'function') cb(response);
        };

        request('/users/pages', {success});
    };

    updateUser = (body, id, cb) => {
        const success = () => {
            if (cb && typeof cb === 'function') cb();
        };

        request(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            success
        });
    };

    deleteUser = (id, cb) => {
        const success = () => {
            if (cb && typeof cb === 'function') cb();
        };

        request(`/users/${id}`, {
            method: 'DELETE',
            success
        });
    };

    changePassword = (body, cb) => {
        const success = () => {
            if (cb && typeof cb === 'function') cb();
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

        };

        await request(`/timetables/${timetableId}/events/${eventId}/confirmed_users`, {success});
    }
}

export default function useUsersApi() {
    const dispatch = useDispatch();

    return useMemo(() => new UsersApi(dispatch), []);
}
