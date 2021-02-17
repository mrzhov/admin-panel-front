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
    name: '',
    role: '',
    isSuper: '',
    email: '',
    balance: '',
    minBalance: '',
    initDiscount: '',
    couponDiscount: '',
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

    const authUserId = useSelector(state => state.authUser.id)
    const sortConfig = useSelector(state => state.commonFlags.sortConfig)

    const [agent, setAgent] = useLegacyState(initialState);
    const [tableTabs, setTableTabs] = useState(tableTabsInitState);

    const { id } = match.params;

    useEffect(() => {
        const userId = id === 'me' ? authUserId : id;
        usersApi.getUser(userId, ({ data }) => setAgent(data));
    }, [id]);

    useEffect(() => {
        getCoupons({ isActivated: true });
        getCoupons({ isActivated: false });
        getDeposits({ ownerId: id === 'me' ? authUserId : id });
    }, [id, sortConfig]);

    const getDeposits = useCallback(config => {
        const cb = response => {
            const newTableTabs = tableTabs.map(el => {
                el.properties.rows = el.tabName === 'Deposits' && response.data
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
    const getCoupons = useCallback(config => {
        const cb = response => {
            const newTableTabs = tableTabs.map(el => {
                config.isActivated
                    ? el.properties.rows = el.tabName === 'Activated coupons' && response.data
                    : el.properties.rows = el.tabName === 'Unactivated coupons' && response.data
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

    const userInfoMiniConfig = [
        {
            title: 'Avatar',
            value: Avatar
        },
        {
            title: 'Name',
            value: agent.name
        },
        {
            title: 'Role',
            value: agent.role
        },
        {
            title: 'Email',
            value: agent.email
        },
    ]
    const userInfoMiniTemplate = config => (
        <div className='userInfoCard userInfoCard_small'>
            <div className="userInfoCard__wrapper">
                <div className="smallCard">
                    {config.map((el, i) => (
                        <div className="smallCard__item" key={i}>
                            {(() => {
                                switch (el.title) {
                                    case 'Avatar':
                                        return <img src={el.value} alt="Avatar"/>
                                    case 'Name':
                                        return <h3>{el.value}</h3>
                                    default:
                                        return <p>{el.value}</p>
                                }
                            })()}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
    const userInfoConfig = [
        {
            title: 'Name',
            value: agent.name
        },
        {
            title: 'Role',
            value: agent.role
        },
        {
            title: 'Super agent',
            value: agent.isSuper ? 'yes' : 'no'
        },
        {
            title: 'Email',
            value: agent.email
        },
        {
            title: 'Balance',
            value: `${agent.balance}$`
        },
        {
            title: 'Minimum balance',
            value: `${agent.minBalance}$`
        },
        {
            title: 'Initial Discount',
            value: `${agent.initDiscount}%`
        },
        {
            title: 'Coupon Discount',
            value: `${agent.couponDiscount}%`
        },
    ]
    const userInfoTemplate = config => (
        <div className='userInfoCard userInfoCard_list'>
            <div className="userInfoCard__wrapper">
                <div className="cardList">
                    {config.map((el, i) => (
                        <div className="cardList__itemContainer" key={i}>
                            {i !== 0 && <hr/>}
                            <div className="cardList__item">
                                <div className="cardList__title">
                                    <h6>{el.title}</h6>
                                </div>
                                <div className="cardList__subtitle">
                                    <p>{el.value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

    return (
        <div className='mainPage'>
            <div className='mainPage__wrapper'>
                <div className='mainPage__userInfo'>
                    {userInfoMiniTemplate(userInfoMiniConfig)}
                    {userInfoTemplate(userInfoConfig)}
                </div>
                <TabsContainer items={tableTabs}/>
            </div>
        </div>
    );
};

export default UserPage;
