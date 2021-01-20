import {envConfig} from "../lib/configs/env";
import {getPages} from "../lib/functions";
import {LOGIN, LOGOUT} from "../redux/actions/authUser";
import {ADD_PAGES} from "../redux/actions/pages";

const URL = envConfig[process.env.NODE_ENV].adminApi

export function login(data, callback) {
    return async dispatch => {
        const request = await fetch(`${URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const {status} = await request;

        if (status === 200) {
            const response = await request.json();
            if (callback && typeof callback === 'function') callback();
            dispatch({
                type: LOGIN,
                response
            });
            dispatch({
                type: ADD_PAGES,
                pagesList: getPages(response.data.role, response.data.isSuper)
            });
        } else {
            switch (status) {
                case 400:
                case 401:
                    alert('Wrong login or password');
                    break;
                case 404:
                    alert('User is not found');
                    break
                default:
                    alert(`Error ${status}`);
                    break;
            }
        }
    };
}

export function logout() {
    return dispatch => {
        dispatch({
            type: LOGOUT
        });
    };
}
