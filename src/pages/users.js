import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import useUsersApi from '../api/usersApi';
import Button from '../components/Button';
import {getQueryString} from '../lib/functions';
import {usersOptions} from '../lib/tableOptions';
import routes from '../route/routes';
import TableContainer from "../components/TableContainer";

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

    const tableActionItems = item => (
        [
            {
                icon: 'info',
                tooltipText: 'Agent information',
                onClick: () =>
                    history.push(
                        routes.userInfo.path.replace(':id', item._id)
                    )
            },
            {
                icon: 'edit',
                tooltipText: 'Change information',
                onClick: () =>
                    history.push(
                        routes.userPage.path.replace(':id', item._id)
                    )
            },
            {
                icon: 'delete',
                tooltipText: 'Remove agent',
                onClick: () =>
                    window.confirm('Do you really want to delete the agent?') &&
                    usersApi.deleteUser(item._id, getUsers)
            }
        ]
    )

    return (
        <div className='mainPage'>
            <div className='mainPage__wrapper'>
                <div className='mainPage__header'>
                    <h3>Agents</h3>
                    <Link to={routes.userPage.path.replace(':id', 'new')}>
                        <Button>Create</Button>
                    </Link>
                </div>
                <TableContainer
                    tableOptions={usersOptions}
                    rows={users}
                    tableActionItems={item => tableActionItems(item)}
                    totalAmount={totalAmount}
                    setSortConfig={config => setSortConfig(config)}
                    sortConfig={sortConfig}
                />
            </div>
        </div>
    );
};

export default UsersPage;
