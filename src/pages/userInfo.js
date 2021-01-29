import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from "react-redux";

import TableContainer from "../components/TableContainer";
import TabsContainer from "../components/TabsContainer";
import useUserApi from '../api/usersApi';
import useCoupons from "../api/couponsApi";
import useDeposits from "../api/depositsApi";
import useLegacyState from '../hooks/useLegacyState';
import { activatedCouponsOptions, depositsOptions, unactivatedCouponsOptions } from "../lib/tableOptions";
import { getRandom } from "../lib/functions";
import Avatar from "../image/avatar.jpg";
import '../scss/pages/userInfo.scss'

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

const tableTabsInitState = [
    {
        id: getRandom(),
        tabName: 'Deposits',
        item: props => <TableContainer {...props} />,
        properties: {
            tableOptions: depositsOptions,
            rows: []
        }
    },
    {
        id: getRandom(),
        tabName: 'Activated coupons',
        item: props => <TableContainer {...props} />,
        properties: {
            tableOptions: activatedCouponsOptions,
            rows: []
        }
    },
    {
        id: getRandom(),
        tabName: 'Unactivated coupons',
        item: props => <TableContainer {...props} />,
        properties: {
            tableOptions: unactivatedCouponsOptions,
            rows: []
        }
    },
];

const UserPage = ({ match }) => {
    const usersApi = useUserApi();
    const couponsApi = useCoupons();
    const depositsApi = useDeposits();

    const { id } = match.params;
    const authUserId = useSelector(state => state.authUser.id)
    const sortConfig = useSelector(state => state.commonFlags.sortConfig)

    const [agent, setUser] = useLegacyState(initialState);
    const [tableTabs, setTableTabs] = useState(tableTabsInitState);

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
        getDeposits({ ownerId: id === 'me' ? authUserId : id });
    }, [id, sortConfig]);

    const getDeposits = useCallback((config) => {
        const cb = response => {
            const newTableTabs = tableTabs.map(el => {
                if (el.tabName === 'Deposits') {
                    el.properties.rows = response.data
                }
                return el;
            })
            setTableTabs(newTableTabs);
        };
        depositsApi.getDeposits({
            id: id === 'me' ? authUserId : id,
            sortField: sortConfig.sortField,
            sortDirection: sortConfig.sortDirection,
            ownerId: config.ownerId
        }, cb);
    }, [id, sortConfig]);

    const getCoupons = useCallback((config) => {
        const cb = response => {
            const newTableTabs = tableTabs.map(el => {
                if (config.isActivated) {
                    if (el.tabName === 'Activated coupons') {
                        el.properties.rows = response.data
                    }
                } else {
                    if (el.tabName === 'Unactivated coupons') {
                        el.properties.rows = response.data
                    }
                }
                return el;
            })
            setTableTabs(newTableTabs);
        };
        couponsApi.getCoupons({
            id: id === 'me' ? authUserId : id,
            sortField: sortConfig.sortField,
            sortDirection: sortConfig.sortDirection,
            isActivated: config.isActivated
        }, cb)
    }, [id, sortConfig]);

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
