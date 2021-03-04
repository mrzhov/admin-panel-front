import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useCoupons from '../../api/couponsApi';
import Button from '../../components/Button';
import FormControl from '../../components/FormControl';
import useLegacyState from '../../hooks/useLegacyState';
import useCouponTypes from '../../api/couponTypesApi';
import useAgentsApi from '../../api/agentsApi';
import { getFormActions, getTitlePage } from "../../lib/templates";
import TextContainer from '../../components/TextContainer';

import './index.scss'

const couponInitState = {
    owner: '',
    creator: '',
    couponType: '',
    quantity: ''
};

const CouponPage = ({ history, match }) => {
    const couponsApi = useCoupons();
    const agentsApi = useAgentsApi();
    const couponTypesApi = useCouponTypes();

    const [coupon, setCoupon] = useLegacyState(couponInitState);
    const [generatedCoupons, setGeneratedCoupons] = useState([]);
    const [flags, setFlags] = useLegacyState({ copied: false })
    const { id } = match.params;

    const users = useSelector(state => state.users.list);
    const user = useSelector(state => state.user);
    const couponTypes = useSelector(state => state.couponTypes.list);

    useEffect(() => {
        setCoupon({ creator: user.id });
        getUsers();
        getCouponTypes()
    }, [id]);

    const getUsers = useCallback(() => {
        agentsApi.getAgents();
    }, [id]);

    const getCouponTypes = useCallback(() => {
        couponTypesApi.getCouponTypes();
    }, [id]);

    const handleSelect = useCallback(name => value => {
        setCoupon({ [name]: value });
    }, [coupon]);

    const handleInput = useCallback(name => e => {
        setCoupon({ [name]: e.target.value });
    }, [coupon]);

    const handleSubmit = useCallback(e => {
        e.preventDefault();
        const body = { ...coupon, owner: coupon.owner.value, couponType: coupon.couponType.value };
        couponsApi.createCoupon(body, response => {
            setGeneratedCoupons(response)
        });
    }, [coupon]);

    const copyAllCodes = () => {
        let generatedCodes = '';
        generatedCoupons.forEach((el, index) => {
            index !== generatedCoupons.length - 1
                ? generatedCodes = generatedCodes + el.code + '\n'
                : generatedCodes = generatedCodes + el.code
        })
        let textArea = document.createElement('textarea');
        textArea.value = generatedCodes;
        document.body.append(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setFlags({ copied: true });
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
    const getAgentOptions = () => (
        users.map(user => ({
            value: user._id,
            label: `${user.name}`
        }))
    )
    const getCouponTypeOptions = () => (
        couponTypes.map(ct => ({
            value: ct._id,
            label: `${ct.limit} limit, ${ct.duration} day, ${ct.price}$`
        }))
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
                                label='Owner'
                                className='formItem'
                                placeholder='Agent'
                                required
                                value={coupon.owner}
                                onChange={handleSelect('owner')}
                                select
                                options={getAgentOptions()}
                            />
                            <FormControl
                                label='Coupon type'
                                className='formItem'
                                placeholder='Coupon type'
                                required
                                value={coupon.couponType}
                                onChange={handleSelect('couponType')}
                                select
                                options={getCouponTypeOptions()}
                            />
                            <FormControl
                                label='Quantity'
                                className='formItem'
                                type='number'
                                step='1'
                                min='1'
                                required
                                value={coupon.quantity}
                                onChange={handleInput('quantity')}
                            />
                            {getFormActions(id, history)}
                        </form>
                    </div>
                </div>
                {!!generatedCoupons.length && getGeneratedList()}
            </div>
        </div>
    );
};

export default CouponPage;
