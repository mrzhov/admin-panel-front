import {logout} from '../../api/userApi';
import {store} from '../../redux/createStore';

import getQueryParameters from './functions';
import {envConfig} from "../configs/env";

const adminApi = process.env.NODE_ENV === 'development'
  ? envConfig[process.env.NODE_ENV].adminApi
  : envConfig["production"].adminApi


export const BOT_API = '/adapt';

const defaultErrors = {
    422: 'Заполните все поля',
    500: 'Ошибка сервера',
    504: 'Превышено время ожидания ответа от сервера'
};

const defaultRequestOptions = {
    method: 'GET'
};

const request = async (pathname, options = defaultRequestOptions) => {
    const {
        done,
        body,
        query,
        errors,
        failed,
        headers,
        success,
        method = 'GET',
        successStatuses,
        absolutePath = false
    } = options;

    let path = `${adminApi}${pathname}`;
    if (absolutePath) path = pathname;

    if (query) path += `?${getQueryParameters(query)}`;

    const requestOptions = {method};

    if (body) requestOptions.body = body;
    if (headers) requestOptions.headers = headers;
    else requestOptions.headers = {'Content-Type': 'application/json'};

    const state = store.getState();
    if (state.user.token)
        requestOptions.headers['x-access-token'] = state.user.token;

    try {
        const serverRequest = await fetch(path, requestOptions);
        let response = {status: 'Development request error'};

        if (options.isBlob) response = await serverRequest.blob();
        else response = await serverRequest.json();

        const status = await serverRequest.status;
        const statuses = successStatuses || [200];
        const errorsStatuses = {...errors, ...defaultErrors};

        if (statuses.indexOf(status) !== -1) {
            if (success) success(response, status);
        } else {
            if (status === 401) {
                store.dispatch(logout());
            }

            if (failed) {
                failed(response, status);
            } else {
                for (const key in errorsStatuses) {
                    if (errorsStatuses.hasOwnProperty(key)) {
                        if (Number(status) === Number(key)) {
                            // eslint-disable-next-line
                            console.error(path, errorsStatuses[key]);
                        }
                    }
                }
            }

            throw response;
        }

        if (done) done(response, status);

        return response;
    } catch (error) {
        // eslint-disable-next-line
        console.log(`ERROR FETCH: ${path}`);

        throw error;
    }
};

export default request;
