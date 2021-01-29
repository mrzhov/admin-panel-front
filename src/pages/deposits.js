import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import TableContainer from "../components/TableContainer";
import Button from '../components/Button';

import useDeposits from '../api/depositsApi';
import routes from '../route/routes';
import { getQueryString } from '../lib/functions';
import { envConfig } from "../lib/configs/env";
import { depositsOptions } from "../lib/tableOptions";

const adminApi = envConfig[process.env.NODE_ENV].adminApi

const depositsOptionsWithActions = () => {
    const arr = [...depositsOptions];
    arr.push(
        {
            name: 'actions',
            value: ''
        }
    );
    return arr;
}

const Deposits = ({ history }) => {
    const depositsApi = useDeposits();
    const { page } = getQueryString();

    const deposits = useSelector(state => state.deposits.list);
    const totalAmount = useSelector(state => state.deposits.totalAmount);
    const sortConfig = useSelector(state => state.commonFlags.sortConfig)

    useEffect(() => {
        getDeposits();
    }, [page, sortConfig]);

    const getDeposits = useCallback(() => {
        depositsApi.getDeposits({
            page,
            sortField: sortConfig.sortField,
            sortDirection: sortConfig.sortDirection,
        });
    }, [page, sortConfig]);

    const tableActionItems = item => (
        [
            {
                icon: 'download',
                tooltipText: 'Download screenshot',
                onClick: () => {
                    if (item.fileLink) {
                        // location.href = `${adminApi}${item.fileLink}`;
                    } else {
                        alert('No screenshot!');
                    }
                }
            },
            {
                icon: 'edit',
                tooltipText: 'Change deposit',
                onClick: () =>
                    history.push(
                        routes.depositPage.path.replace(':id', item._id)
                    )
            },
            {
                icon: 'delete',
                tooltipText: 'Remove deposit',
                onClick: () =>
                    window.confirm('Do you really want to delete the deposit?') &&
                    depositsApi.deleteDeposit(item._id, getDeposits)
            }
        ]
    )

    return (
        <div className='mainPage'>
            <div className='mainPage__wrapper'>
                <div className='mainPage__header'>
                    <h3>Deposits</h3>
                    <Link to={routes.depositPage.path.replace(':id', 'new')}>
                        <Button>Create</Button>
                    </Link>
                </div>
                <TableContainer
                    tableOptions={depositsOptionsWithActions()}
                    rows={deposits}
                    tableActionItems={item => tableActionItems(item)}
                    totalAmount={totalAmount}
                />
            </div>
        </div>
    );
};

export default Deposits;
