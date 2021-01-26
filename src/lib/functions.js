import queryString from 'query-string';
import moment from 'moment';

import {ADMIN, AGENT, SUB_AGENT} from './_variables';
import React from "react";

export const getTitlePage = (id, type) => {
    if (id && id !== 'new') {
        return <h3>Change {type} information</h3>
    } else {
        return <h3>Create {type}</h3>
    }
}

export const setLocalStorage = (name, item) => {
    localStorage.setItem(name, JSON.stringify(item));
};

export const getLocalStorage = name => {
    let response = 'Name is not found';
    if (name) {
        if (
            localStorage.getItem(name) &&
            localStorage.getItem(name) !== 'undefined' &&
            localStorage.getItem(name) !== 'false'
        ) {
            const storage = localStorage.getItem(name);
            const result = JSON.parse(storage);

            if (result && result.timestamp) {
                const currentTime = new Date().getTime();
                const expireTime = 200000;

                if (currentTime - result.timestamp > expireTime) {
                    response = false;
                    localStorage.setItem(name, JSON.stringify(false));
                } else {
                    response = result;
                }
            } else {
                response = result;
            }
        } else {
            response = false;
        }
    }

    return response;
};

export const getPages = (role, isSuper) => {
    const pagesList = []

    switch (role) {
        case ADMIN:
            pagesList.push({
                name: 'Agents',
                url: '/admin/users'
            })
            pagesList.push({
                name: 'Coupons',
                url: '/admin/coupons'
            })
            pagesList.push({
                name: 'Coupon types',
                url: '/admin/coupon-types'
            })
            pagesList.push({
                name: 'Wallets',
                url: '/admin/wallets'
            })
            pagesList.push({
                name: 'Deposits',
                url: '/admin/deposits'
            })
            pagesList.push({
                name: 'Promotions',
                url: '/admin/promo'
            })
            pagesList.push({
                name: 'Applications',
                url: '/admin/apps'
            })
            pagesList.push({
                name: 'Contacts',
                url: '/admin/contacts'
            })
            break;
        case AGENT:
            pagesList.push({
                name: 'Agents',
                url: '/admin/users'
            })
            pagesList.push({
                name: 'Coupons',
                url: '/admin/coupons'
            })
            pagesList.push({
                name: 'Coupon types',
                url: '/admin/coupon-types'
            })
            if (isSuper) {
                pagesList.push({
                    name: 'Deposits',
                    url: '/admin/deposits'
                })
            }
            break;
        case SUB_AGENT:
            pagesList.push({
                name: 'Coupons',
                url: '/admin/coupons'
            })
            pagesList.push({
                name: 'Coupon types',
                url: '/admin/coupon-types'
            })
            break;

        default:
            break;
    }

    return pagesList
}

export const truncate = (str, maxlength) => {
    if (typeof str !== 'string') {
        return str;
    }
    if (str.length > maxlength) {
        return `${str.slice(0, maxlength - 3)}...`;
    }

    return str;
};

export const getQueryParameter = (parameter, isParams = false) => {
    let name = false;
    const params = {};

    if (window.location) {
        const data = window.location.search.replace('?', '');

        data.split('&').forEach(a => {
            const [param, value] = a.split('=');
            if (param === 'regions' || param === 'cities' || param === 'districts') {
                if (!Array.isArray(params[param])) {
                    params[param] = [value];
                } else {
                    params[param].push(value);
                }
            } else {
                params[param] = value;
            }
        });

        if (isParams) {
            return params;
        }

        for (const param in params) {
            if (param === parameter) {
                name = params[param];
            }
        }
    }

    return name;
};

export const getValue = (key, value) => {
    if (Array.isArray(value)) {
        return value.map(val => getValue(key, val)).join('&');
    }
    return `${key}=${encodeURIComponent(value)}`;
};

export const getQueryParametres = (obj = {}) => {
    let res = '';

    const keys = Object.keys(obj);
    for (let j = 0; j < keys.length; j += 1) {
        const i = keys[j];
        if (obj[i] !== undefined) {
            if (res === '') {
                res = getValue(i, obj[i]);
            } else {
                res += `&${getValue(i, obj[i])}`;
            }
        }
    }
    return res;
};

export const getQueryString = (param, search = '') => {
    const params = queryString.parse(search || window.location.search);

    return param ? params[param] : params;
};

export function pushHistory(query, isReplace, history) {
    const formatedQuery = {
        ...getQueryString(),
        ...query
    };

    for (const key in formatedQuery) {
        if (!formatedQuery[key] && formatedQuery[key] !== 0) {
            delete formatedQuery[key];
        }
    }

    const method = isReplace ? 'replace' : 'push';

    history[method](
        `${history.location.pathname}?${queryString.stringify({
            ...formatedQuery
        })}`
    );
}

export const getRandom = () =>
    String(
        Math.random()
            .toString(36)
            .replace(/[.\d]/g, '')
    );

export const formatDate = (date, options = {}) => {
    let format = 'DD/MM/YYYY';

    if (options.timeOnly) format = 'HH:mm';

    return moment(date).format(format);
};
