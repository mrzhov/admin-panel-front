import React, { useCallback, useEffect } from 'react';

import useCouponTypes from '../api/couponTypesApi';
import FormControl from '../components/FormControl';
import useLegacyState from '../hooks/useLegacyState';
import routes from '../route/routes';
import { getFormActions, getTitlePage } from "../lib/templates";

const couponTypeInitState = {
    limit: '',
    price: '',
    duration: '',
};

const CouponType = ({ history, match }) => {
    const couponTypesApi = useCouponTypes();
    const [couponType, setCouponType] = useLegacyState(couponTypeInitState);
    const { id } = match.params;

    useEffect(() => {
        if (id && id !== 'new') {
            couponTypesApi.getCouponType(id, ({ data }) => {
                data.limit = { value: data.limit, label: data.limit };
                setCouponType(data)
            });
        }
    }, [id]);

    const handleSelect = useCallback(limit => {
        setCouponType({ limit });
    }, [couponType])

    const handleInput = useCallback(name => e => {
        setCouponType({ [name]: e.target.value })
    }, [couponType]);

    const handleSubmit = useCallback(e => {
        e.preventDefault();
        const cb = () => history.push(routes.couponTypesPage.path);
        const body = { ...couponType, limit: couponType.limit.value };
        id && id !== 'new'
            ? couponTypesApi.updateCouponType(body, id, cb)
            : couponTypesApi.createCouponType(body, cb);
    }, [couponType]);

    const getLimits = () => {
        return [
            { value: '1/2', label: '1/2' },
            { value: '2/4', label: '2/4' },
            { value: '5/10', label: '5/10' },
            { value: '10/20', label: '10/20' },
            { value: '20/40', label: '20/40' },
            { value: '25/50', label: '25/50' },
            { value: '50/100', label: '50/100' },
            { value: '100/200', label: '100/200' },
        ];
    };
    return (
        <div className='mainPage'>
            <div className='mainPage__wrapper mainPage__center'>
                <div className='formContainer'>
                    <div className="form">
                        <div className='form__title'>
                            {getTitlePage(id, 'coupon type')}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <FormControl
                                label='Limit'
                                className='formItem'
                                placeholder='Limit'
                                required
                                value={couponType.limit}
                                onChange={handleSelect}
                                select
                                options={getLimits()}
                            />
                            <FormControl
                                label='Price in dollars'
                                className='formItem'
                                type='number'
                                step='1'
                                min='1'
                                required
                                value={couponType.price}
                                onChange={handleInput('price')}
                            />
                            <FormControl
                                label='Duration'
                                className='formItem'
                                type='number'
                                step='1'
                                min='1'
                                required
                                value={couponType.duration}
                                onChange={handleInput('duration')}
                            />
                            {getFormActions(id, history)}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CouponType;
