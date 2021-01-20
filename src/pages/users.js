import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import useUsersApi from '../api/usersApi';
import Button from '../components/button';
import {getQueryString} from '../lib/functions';
import routes from '../route/routes';

const UsersPage = ({history}) => {
    const usersApi = useUsersApi();
    const {page} = getQueryString();

    //const users = useSelector(state => state.users.list) || [];
    //const totalAgents = useSelector(state => state.users.totalAmount);

    const [flags, setFlags] = useState({getUsers: true});
    const [filterValue, setFilterValue] = useState('');
    const [sortConfig, setSortConfig] = useState({
        sortField: '',
        sortDirection: ''
    });

    // useEffect(() => {
    //     if (flags.getUsers) {
    //         getUsers();
    //     }
    // }, [page, sortConfig]);
    //
    // const getUsers = useCallback(() => {
    //     usersApi.getUsers({
    //         page,
    //         sortField: sortConfig.sortField,
    //         sortDirection: sortConfig.sortDirection,
    //         filterValue
    //     })
    // }, [page, sortConfig, filterValue]);

    const handleInput = useCallback(
        e => {
            const {value} = e.target;
            setFilterValue(value);
        },
        [filterValue]
    );

    const handleSubmit = useCallback(
        e => {
            e.preventDefault();

            const cb = () => setFlags({getUsers: true});

            setFlags({getUsers: false});
            history.push({
                search: ''
            });

            setSortConfig({
                sortField: '',
                sortDirection: ''
            })

            usersApi.getUsers({
                page: undefined,
                sortField: '',
                sortDirection: '',
                filterValue
            }, cb)
        },
        [filterValue]
    );

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
        <div className='pageContainer'>
            <div className='pageWrapper'>
                <div className='page-header'>
                    <div className='header-leftSection'>
                        <h1>Agents</h1>
                        {/*<form onSubmit={handleSubmit}>*/}
                        {/*    <FormControl*/}
                        {/*        label='Search'*/}
                        {/*        onChange={handleInput}*/}
                        {/*        value={filterValue}*/}
                        {/*        className='filterField'*/}
                        {/*    />*/}
                        {/*    <Button type='submit'>Search</Button>*/}
                        {/*</form>*/}
                    </div>

                    <Link to={routes.userPage.path.replace(':id', 'new')}>
                        <Button>Create</Button>
                    </Link>
                </div>

                {/*<Table*/}
                {/*    options={[*/}
                {/*        {*/}
                {/*            name: 'name',*/}
                {/*            value: 'User'*/}
                {/*        },*/}
                {/*        {*/}
                {/*            name: 'email',*/}
                {/*            value: 'Email'*/}
                {/*        },*/}
                {/*        {*/}
                {/*            name: 'balance',*/}
                {/*            value: 'Balance',*/}
                {/*            className: 'tableBoldFont'*/}
                {/*        },*/}
                {/*        {*/}
                {/*            name: 'minBalance',*/}
                {/*            value: 'MinBalance',*/}
                {/*            className: 'tableBoldFont'*/}
                {/*        },*/}
                {/*        {*/}
                {/*            name: 'couponDiscount',*/}
                {/*            value: 'Coupon Discount'*/}
                {/*        },*/}
                {/*        {*/}
                {/*            name: 'role',*/}
                {/*            value: 'Role'*/}
                {/*        },*/}
                {/*        {*/}
                {/*            name: 'isSuper',*/}
                {/*            value: 'Super'*/}
                {/*        },*/}
                {/*        {*/}
                {/*            name: 'actions',*/}
                {/*            value: ''*/}
                {/*        }*/}
                {/*    ]}*/}
                {/*    rows={users.map(user => ({*/}
                {/*        ...user,*/}
                {/*        balance: `${Math.floor(user.balance)}$`,*/}
                {/*        minBalance: `${Math.floor(user.minBalance)}$`,*/}
                {/*        couponDiscount: transformCouponDiscount(user),*/}
                {/*        isSuper: user.isSuper ? "yes" : "no",*/}
                {/*        actions: (*/}
                {/*            <TableActions*/}
                {/*                items={[*/}
                {/*                    {*/}
                {/*                        icon: 'info',*/}
                {/*                        tooltipText: 'Agent information',*/}
                {/*                        onClick: () =>*/}
                {/*                            history.push(*/}
                {/*                                routes.userInfo.path.replace(':id', user._id)*/}
                {/*                            )*/}
                {/*                    },*/}
                {/*                    {*/}
                {/*                        icon: 'edit',*/}
                {/*                        tooltipText: 'Change information',*/}
                {/*                        onClick: () =>*/}
                {/*                            history.push(*/}
                {/*                                routes.userPage.path.replace(':id', user._id)*/}
                {/*                            )*/}
                {/*                    },*/}
                {/*                    {*/}
                {/*                        icon: 'delete',*/}
                {/*                        tooltipText: 'Remove agent',*/}
                {/*                        onClick: () =>*/}
                {/*                            window.confirm('Do you really want to delete the user?') &&*/}
                {/*                            usersApi.deleteUser(user._id, getUsers)*/}
                {/*                    }*/}
                {/*                ]}*/}
                {/*            />*/}
                {/*        )*/}
                {/*    }))}*/}
                {/*    sort={true}*/}
                {/*    filter={!!filterValue}*/}
                {/*    totalAmount={totalAgents}*/}
                {/*    setSortingField={config => setSortConfig(config)}*/}
                {/*    parentSortConfig={sortConfig}*/}
                {/*/>*/}
            </div>
        </div>
    );
};

export default UsersPage;
