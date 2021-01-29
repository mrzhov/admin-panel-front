import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from "react-router-dom";

import '../scss/pages/coupon.scss'

import useCoupons from '../api/couponsApi';
import Button from '../components/Button';
import FormControl from '../components/FormControl';
import useLegacyState from '../hooks/useLegacyState';
import useCouponTypes from '../api/couponTypesApi';
import useUsers from '../api/usersApi';
import {getTitlePage} from '../lib/functions';
import TextContainer from '../components/TextContainer';

const initialState = {
    owner: '',
    creator: '',
    couponType: '',
    quantity: ''
};

const Coupon = ({match}) => {
    const couponsApi = useCoupons();
    const usersApi = useUsers();
    const couponTypesApi = useCouponTypes();

    const [coupon, setCoupon] = useLegacyState(initialState);
    const [generatedCoupons, setGeneratedCoupons] = useState([]);
    const [flags, setFlags] = useLegacyState({copied: false})

    const {id} = match.params;

    const users = useSelector(state => state.users.list);
    const user = useSelector(state => state.authUser);
    const couponTypes = useSelector(state => state.couponTypes.list);

    const getUsers = useCallback(() => {
        usersApi.getUsers();
    }, [id]);

    const getCouponTypes = useCallback(() => {
        couponTypesApi.getCouponTypes();
    }, [id]);

    useEffect(() => {
        if (id && id !== 'new') {
            couponsApi.getCoupon(id, ({data}) => setCoupon(data));
        }

        setCoupon({creator: user.id});
        getUsers();
        getCouponTypes()
    }, [id]);

    const handleInput = useCallback(
        name => e => {
            const {value} = e.target;

            setCoupon({[name]: value});
        },
        [coupon]
    );

    const handleSelect = useCallback(name => value => {
        setCoupon({[name]: value});
    }, [coupon]);

    const handleSubmit = useCallback(
        e => {
            e.preventDefault();

            coupon.owner = coupon.owner.value;
            coupon.couponType = coupon.couponType.value;
            if (id && id !== 'new') {
                couponsApi.updateCoupon(coupon, id);
            } else {
                couponsApi.createCoupon(coupon, (response) => {
                    setGeneratedCoupons(response)
                });
            }
        },
        [coupon]
    );

    function getAgentOptions() {
        return users.map(user => ({
            label: `${user.name}`,
            value: user._id
        }))
    }

    function getCouponTypeOptions() {
        return couponTypes.map(ct => ({
            label: `${ct.limit} limit, ${ct.duration} day, ${ct.price}$, ${ct.priceYuan} yuan`,
            value: ct._id
        }))
    }

    const copyAllCodes = () => {
        let generatedCodes = '';
        generatedCoupons.forEach((el, index) => {
            if (index !== generatedCoupons.length - 1) {
                generatedCodes = generatedCodes + el.code + '\n';
            } else {
                generatedCodes = generatedCodes + el.code;
            }
        })

        let textArea = document.createElement('textarea');
        textArea.value = generatedCodes;
        document.body.append(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        setFlags({copied: true});
    };

    const getGeneratedList = () => (
        <div className='generatedList'>
            <div className='form__title'>
                <h3>Generated list</h3>
            </div>
            {generatedCoupons.map((el, index) => <TextContainer text={el.code} key={index}/>)}
            <Button
                variant='large'
                onClick={copyAllCodes}
            >
                {flags.copied ? 'Copied successfully!' : 'Copy all codes'}
            </Button>
        </div>
    )

    return (
        <div className='mainPage'>
            <div className='mainPage__wrapper mainPage__center'>
                <div className='formContainer'>
                    <div className="form">
                        <div className='form__title'>
                            {getTitlePage(id, 'coupon')}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <FormControl
                                label='Select'
                                className='formItem'
                                onChange={handleSelect('owner')}
                                options={getAgentOptions()}
                                placeholder='Agent'
                                required={id && id === 'new'}
                                select
                                value={coupon.owner}
                            />
                            <FormControl
                                label='Select'
                                className='formItem'
                                onChange={handleSelect('couponType')}
                                options={getCouponTypeOptions()}
                                placeholder='Coupon type'
                                required={id && id === 'new'}
                                select
                                value={coupon.couponType}
                            />
                            {id && id === 'new' && (<FormControl
                                label='Quantity'
                                className='formItem'
                                min='0'
                                onChange={handleInput('quantity')}
                                required
                                step='1'
                                type='number'
                                value={coupon.quantity}
                            />)}
                            <div className='form__actions'>
                                <Button
                                    type='submit'
                                    variant='small'
                                >
                                    {id && id === 'new' ? 'Generate' : 'Save'}
                                </Button>
                                <Link to='/admin/coupons'>
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
                {id && id === 'new' && Boolean(generatedCoupons.length) && getGeneratedList()}
            </div>
        </div>
    );
};

export default Coupon;
