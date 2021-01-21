import React, {useEffect} from 'react';
import {useSelector} from "react-redux";

import useUserApi from '../api/usersApi';
import useLegacyState from '../hooks/useLegacyState';

import '../scss/pages/userInfo.scss'
import Avatar from "../image/avatar.jpg";

const initialState = {
    role: '',
    name: '',
    email: '',
    balance: '',
    minBalance: '',
    initDiscount: '',
    couponDiscount: '',
    isSuper: '',
    ownerName: ''
};

const UserPage = ({match}) => {
    const usersApi = useUserApi();
    // const couponsApi = useCoupons();
    // const depositsApi = useDeposits();

    const {id} = match.params;
    const authUserId = useSelector(state => state.authUser.id)

    const [agent, setUser] = useLegacyState(initialState);

    useEffect(() => {
        const userId = id === 'me' ? authUserId : id;
        usersApi.getUser(userId, data => {
            const {role, name, email, balance, minBalance, initDiscount, couponDiscount, isSuper} = data;
            setUser({
                role,
                name,
                email,
                balance,
                minBalance,
                initDiscount,
                couponDiscount,
                isSuper
            })
        });
    }, [id]);

    return (
        <div className='mainPage'>
            <div className='mainPage__wrapper'>
                <div className='mainPage__userInfo'>
                    <div className='userInfoCard userInfoCard_small'>
                        <div className="userInfoCard__wrapper">
                            <div className="smallCard">
                                <div className="smallCard__item">
                                    <img src={Avatar} alt="Avatar"/>
                                </div>
                                <div className="smallCard__item">
                                    <h3>{agent.name}</h3>
                                </div>
                                <div className="smallCard__item">
                                    <p>{agent.role}</p>
                                </div>
                                <div className="smallCard__item">
                                    <p>{agent.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='userInfoCard userInfoCard_list'>
                        <div className="userInfoCard__wrapper">
                            <div className="cardList">
                                <div className="cardList__item">
                                    <div className="cardList__title">
                                        <h6>Name</h6>
                                    </div>
                                    <div className="cardList__subTitle">
                                        <p>{agent.name}</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="cardList__item">
                                    <div className="cardList__title">
                                        <h6>Role</h6>
                                    </div>
                                    <div className="cardList__subTitle">
                                        <p>{agent.role}</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="cardList__item">
                                    <div className="cardList__title">
                                        <h6>Email</h6>
                                    </div>
                                    <div className="cardList__subTitle">
                                        <p>{agent.email}</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="cardList__item">
                                    <div className="cardList__title">
                                        <h6>Balance</h6>
                                    </div>
                                    <div className="cardList__subTitle">
                                        <p>{agent.balance}$</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="cardList__item">
                                    <div className="cardList__title">
                                        <h6>Minimum balance</h6>
                                    </div>
                                    <div className="cardList__subTitle">
                                        <p>{agent.minBalance}$</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="cardList__item">
                                    <div className="cardList__title">
                                        <h6>Initial Discount</h6>
                                    </div>
                                    <div className="cardList__subTitle">
                                        <p>{agent.initDiscount}%</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="cardList__item">
                                    <div className="cardList__title">
                                        <h6>Coupon Discount</h6>
                                    </div>
                                    <div className="cardList__subTitle">
                                        <p>{agent.couponDiscount}%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;
