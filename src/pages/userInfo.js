import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from "react-redux";

import useUserApi from '../api/usersApi';
import useLegacyState from '../hooks/useLegacyState';

import '../scss/pages/userInfo.scss'
import Avatar from "../image/avatar.jpg";
import useCoupons from "../api/couponsApi";
import { activatedCouponsOptions, unactivatedCouponsOptions } from "../lib/tableOptions";
import TableContainer from "../components/TableContainer";
import TabsContainer from "../components/TabsContainer";
import { getRandom } from "../lib/functions";

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

const UserPage = ({ match }) => {
    const usersApi = useUserApi();
    const couponsApi = useCoupons();
    // const depositsApi = useDeposits();

    const { id } = match.params;
    const authUserId = useSelector(state => state.authUser.id)
    const sortConfig = useSelector(state => state.commonFlags.sortConfig)

    const [agent, setUser] = useLegacyState(initialState);
    const [activatedCoupons, setActivatedCoupons] = useState([]);
    const [unactivatedCoupons, setUnActivatedCoupons] = useState([]);

    useEffect(() => {
        const userId = id === 'me' ? authUserId : id;
        usersApi.getUser(userId, data => {
            const { role, name, email, balance, minBalance, initDiscount, couponDiscount, isSuper } = data;
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

    useEffect(() => {
        getCoupons({ isActivated: true });
        getCoupons({ isActivated: false });
    }, [id, sortConfig]);

    const getCoupons = useCallback((config) => {
        const cb = response => {
            config.isActivated
                ? setActivatedCoupons(response.data)
                : setUnActivatedCoupons(response.data)
        };
        couponsApi.getCoupons({
            id: id === 'me' ? authUserId : id,
            sortField: sortConfig.sortField,
            sortDirection: sortConfig.sortDirection,
            isActivated: config.isActivated
        }, cb)
    }, [id, sortConfig]);

    const tableTabs = [
        {
            id: getRandom(),
            tabName: 'Activated coupons',
            item:
                <TableContainer
                    tableOptions={activatedCouponsOptions}
                    rows={activatedCoupons}
                />
        },
        {
            id: getRandom(),
            tabName: 'Unactivated coupons',
            item:
                <TableContainer
                    tableOptions={unactivatedCouponsOptions}
                    rows={unactivatedCoupons}
                />
        },
    ]

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
                                    <div className="cardList__subtitle">
                                        <p>{agent.name}</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="cardList__item">
                                    <div className="cardList__title">
                                        <h6>Role</h6>
                                    </div>
                                    <div className="cardList__subtitle">
                                        <p>{agent.role}</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="cardList__item">
                                    <div className="cardList__title">
                                        <h6>Email</h6>
                                    </div>
                                    <div className="cardList__subtitle">
                                        <p>{agent.email}</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="cardList__item">
                                    <div className="cardList__title">
                                        <h6>Balance</h6>
                                    </div>
                                    <div className="cardList__subtitle">
                                        <p>{agent.balance}$</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="cardList__item">
                                    <div className="cardList__title">
                                        <h6>Minimum balance</h6>
                                    </div>
                                    <div className="cardList__subtitle">
                                        <p>{agent.minBalance}$</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="cardList__item">
                                    <div className="cardList__title">
                                        <h6>Initial Discount</h6>
                                    </div>
                                    <div className="cardList__subtitle">
                                        <p>{agent.initDiscount}%</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="cardList__item">
                                    <div className="cardList__title">
                                        <h6>Coupon Discount</h6>
                                    </div>
                                    <div className="cardList__subtitle">
                                        <p>{agent.couponDiscount}%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <TabsContainer items={tableTabs}/>
            </div>
        </div>
    );
};

export default UserPage;
