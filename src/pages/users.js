import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import useUsersApi from '../api/usersApi';
import Button from '../components/Button';
import Table from '../components/Table';
import TableActions from '../components/TableActions';
import {getQueryString} from '../lib/functions';
import routes from '../route/routes';

const UsersPage = ({history}) => {
    const usersApi = useUsersApi();
    const {page} = getQueryString();

    const users = useSelector(state => state.users.list);
    const totalAmount = useSelector(state => state.users.totalAmount);

    const [sortConfig, setSortConfig] = useState({
        sortField: '',
        sortDirection: ''
    });

    useEffect(() => {
        getUsers();
    }, [page, sortConfig]);

    const getUsers = useCallback(() => {
        usersApi.getUsers({
            page,
            sortField: sortConfig.sortField,
            sortDirection: sortConfig.sortDirection
        })
    }, [page, sortConfig]);

    const transformCouponDiscount = (user) => {
        if (user.promo.promoType) {
            if (user.promo.promoType === 'Fixed') {
                return `${user.initDiscount}% -> ${user.couponDiscount}%`
            } else {
                return `${user.initDiscount}% -> ${user.initDiscount}% + ${user.promo.discount}%`
            }
        } else {
            return `${user.initDiscount}%`
        }
    }

    return (
        <div className='mainPage'>
            <div className='mainPage__wrapper'>
                <div className='mainPage__header'>
                    <h3>Agents</h3>
                    <Link to={routes.userPage.path.replace(':id', 'new')}>
                        <Button>Create</Button>
                    </Link>
                </div>

                <Table
                    options={[
                        {
                            name: 'name',
                            value: 'User'
                        },
                        {
                            name: 'email',
                            value: 'Email'
                        },
                        {
                            name: 'balance',
                            value: 'Balance',
                            className: 'tableBoldFont'
                        },
                        {
                            name: 'minBalance',
                            value: 'MinBalance',
                            className: 'tableBoldFont'
                        },
                        {
                            name: 'couponDiscount',
                            value: 'Coupon Discount'
                        },
                        {
                            name: 'role',
                            value: 'Role'
                        },
                        {
                            name: 'isSuper',
                            value: 'Super'
                        },
                        {
                            name: 'actions',
                            value: ''
                        }
                    ]}
                    rows={users.map(user => ({
                        ...user,
                        balance: `${Math.floor(user.balance)}$`,
                        minBalance: `${Math.floor(user.minBalance)}$`,
                        couponDiscount: transformCouponDiscount(user),
                        isSuper: user.isSuper ? "yes" : "no",
                        actions: (
                            <TableActions
                                items={[
                                    {
                                        icon: 'info',
                                        tooltipText: 'Agent information',
                                        onClick: () =>
                                            history.push(
                                                routes.userInfo.path.replace(':id', user._id)
                                            )
                                    },
                                    {
                                        icon: 'edit',
                                        tooltipText: 'Change information',
                                        onClick: () =>
                                            history.push(
                                                routes.userPage.path.replace(':id', user._id)
                                            )
                                    },
                                    {
                                        icon: 'delete',
                                        tooltipText: 'Remove agent',
                                        onClick: () =>
                                            window.confirm('Do you really want to delete the agent?') &&
                                            usersApi.deleteUser(user._id, getUsers)
                                    }
                                ]}
                            />
                        )
                    }))}
                    // sort={true}
                    // filter={!!filterValue}
                    // totalAmount={totalAgents}
                    // setSortingField={config => setSortConfig(config)}
                    // parentSortConfig={sortConfig}
                />
            </div>
        </div>
    );
};

export default UsersPage;
