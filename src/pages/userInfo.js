import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from "react-redux";

import TableContainer from "../components/TableContainer";
import TabsContainer from "../components/TabsContainer";
import useUserApi from '../api/usersApi';
import useCoupons from "../api/couponsApi";
import useDeposits from "../api/depositsApi";
import useLegacyState from '../hooks/useLegacyState';
import { activatedCouponsOptions, depositsOptions, unactivatedCouponsOptions } from "../lib/tableOptions";
import { getRandom, pushHistory } from "../lib/functions";
import Avatar from "../image/avatar.jpg";
import '../scss/pages/userInfo.scss'

const agentInitState = {
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
        template: props => <TableContainer {...props} />,
        properties: {
            tableOptions: depositsOptions,
            rows: [],
            totalAmount: 0
        },
        fetchData: {}
    },
    {
        id: getRandom(),
        tabName: 'Activated coupons',
        template: props => <TableContainer {...props} />,
        properties: {
            tableOptions: activatedCouponsOptions,
            rows: [],
            totalAmount: 0
        },
        fetchData: {}
    },
    {
        id: getRandom(),
        tabName: 'Unactivated coupons',
        template: props => <TableContainer {...props} />,
        properties: {
            tableOptions: unactivatedCouponsOptions,
            rows: [],
            totalAmount: 0
        },
        fetchData: {}
    },
];

const UserPage = ({ match, history }) => {
    const usersApi = useUserApi();
    const couponsApi = useCoupons();
    const depositsApi = useDeposits();

    const { id } = match.params;
    const authUserId = useSelector(state => state.authUser.id)
    const currentId = id === 'me' ? authUserId : id;

    const [agent, setAgent] = useLegacyState(agentInitState);
    const [tableTabs, setTableTabs] = useState(tableTabsInitState);

    useEffect(() => {
        pushHistory({ page: '' }, true, history);
        usersApi.getUser(currentId, ({ data }) => setAgent(data));
        setTableTabsCb();
    }, [id]);

    const setTableTabsCb = () => {
        const newTableTabs = tableTabs.map(el => {
            switch (el.tabName) {
                case 'Deposits':
                    el.fetchData.func = getDeposits;
                    break;
                case 'Activated coupons':
                    el.fetchData.func = getCoupons;
                    el.fetchData.params = { isActivated: true };
                    break;
                case 'Unactivated coupons':
                    el.fetchData.func = getCoupons;
                    el.fetchData.params = { isActivated: false };
                    break;
                default:
                    break;
            }
            return el;
        })
        setTableTabs(newTableTabs);
    }
    const setTableTabsProps = (el, response) => {
        el.properties.rows = response.data || [];
        el.properties.totalAmount = response.totalAmount || 0;
        return el;
    }
    const getDeposits = useCallback(({ sortField, sortDirection, page }) => {
        const cb = response => {
            const newTableTabs = tableTabs.map(el => {
                if (el.tabName === 'Deposits')
                    el = setTableTabsProps(el, response);
                return el;
            });
            setTableTabs(newTableTabs);
        };
        depositsApi.getDeposits({
            id: currentId,
            ownerId: currentId,
            sortField,
            sortDirection,
            page
        }, cb);
    }, [id]);
    const getCoupons = useCallback(({ sortField, sortDirection, isActivated, page }) => {
        const cb = response => {
            const newTableTabs = tableTabs.map(el => {
                if (isActivated && el.tabName === 'Activated coupons') {
                    el = setTableTabsProps(el, response);
                } else if (el.tabName === 'Unactivated coupons') {
                    el = setTableTabsProps(el, response);
                }
                return el;
            })
            setTableTabs(newTableTabs);
        };
        couponsApi.getCoupons({
            id: currentId,
            isActivated,
            sortField,
            sortDirection,
            page
        }, cb)
    }, [id]);

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
                <TabsContainer tabs={tableTabs}/>
            </div>
        </div>
    );
};

export default UserPage;
