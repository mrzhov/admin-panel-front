import React, {useCallback, useEffect} from 'react';

import useCouponTypes from '../api/couponTypesApi';
import Button from '../components/Button';
import FormControl from '../components/FormControl';
import useLegacyState from '../hooks/useLegacyState';
import routes from '../route/routes';
import {Link} from "react-router-dom";
import {getTitlePage} from "../lib/functions";

const initialState = {
    id: '',
    duration: '',
    limit: '',
    price: '',
    priceYuan: '',
    description: '',
    isActive: true
};

const CouponType = ({history, match}) => {
    const couponTypesApi = useCouponTypes();

    const [couponType, setCouponType] = useLegacyState(initialState);

    const {id} = match.params;

    useEffect(() => {
        if (id && id !== 'new') {
            couponTypesApi.getCouponType(id, ({data}) => {
                setCouponType(data)
            });
        }
    }, [id]);

    const handleInput = useCallback(
        name => e => {
            const {value} = e.target;

            if (name === 'limit') {
                setCouponType({[name]: value.replace(/[^0-9\/]/g, "")})
            } else {
                setCouponType({[name]: value})
            }
        },
        [couponType]
    );

    const handleSubmit = useCallback(
        e => {
            e.preventDefault();

            const cb = () => history.push(routes.couponTypesPage.path);

            if (id && id !== 'new') {
                couponTypesApi.updateCouponType(couponType, id, cb);
            } else {
                couponTypesApi.createCouponType(couponType, cb);
            }
        },
        [couponType]
    );

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
                                label='Duration'
                                className='formItem'
                                maxLength={60}
                                onChange={handleInput('duration')}
                                required
                                type='number'
                                value={couponType.duration}
                            />
                            <FormControl
                                label='Limit'
                                className='formItem'
                                onChange={handleInput('limit')}
                                required
                                value={couponType.limit}
                            />
                            <FormControl
                                label='Price in dollars '
                                className='formItem'
                                min='0'
                                onChange={handleInput('price')}
                                required
                                step='1'
                                type='number'
                                value={couponType.price}
                            />
                            <FormControl
                                label='Price in yuan'
                                className='formItem'
                                min='0'
                                onChange={handleInput('priceYuan')}
                                required
                                step='1'
                                type='number'
                                value={couponType.priceYuan}
                            />
                            <FormControl
                                label='Description'
                                className='formItem'
                                maxLength={60}
                                minLength={3}
                                onChange={handleInput('description')}
                                textarea
                                value={couponType.description}
                            />
                            <div className='form__actions'>
                                <Button
                                    type='submit'
                                    variant='small'
                                >
                                    {id && id === 'new' ? 'Create' : 'Save'}
                                </Button>
                                <Link to='/admin/coupon-types'>
                                    <Button
                                        type='button'
                                        variant='small'
                                        className='secondary'
                                    >
                                        Back
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CouponType;
