import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '../components/Button';
import TableContainer from "../components/TableContainer";

import useWallets from '../api/walletsApi';
import { getQueryString } from '../lib/functions';
import routes from '../route/routes';
import { walletsOptions } from "../lib/tableOptions";

const Wallets = ({ history }) => {
    const walletsApi = useWallets();
    const { page } = getQueryString();

    const wallets = useSelector(state => state.wallets.list);
    const totalAmount = useSelector(state => state.wallets.totalAmount);
    const sortConfig = useSelector(state => state.commonFlags.sortConfig)

    useEffect(() => {
        getWallets();
    }, [page, sortConfig]);

    const getWallets = useCallback(() => {
        walletsApi.getWallets({
            page,
            sortField: sortConfig.sortField,
            sortDirection: sortConfig.sortDirection,
        });
    }, [page, sortConfig]);

    const tableActionItems = item => (
        [
            {
                icon: 'edit',
                tooltipText: 'Change wallet',
                onClick: () =>
                    history.push(
                        routes.walletPage.path.replace(':id', item._id)
                    )
            },
            {
                icon: 'delete',
                tooltipText: 'Remove wallet',
                onClick: () =>
                    window.confirm('Do you really want to delete the wallet?') &&
                    walletsApi.deleteWallet(item._id, getWallets)
            }
        ]
    )

    return (
        <div className='mainPage'>
            <div className='mainPage__wrapper'>
                <div className='mainPage__header'>
                    <h3>Wallets</h3>
                    <Link to={routes.walletPage.path.replace(':id', 'new')}>
                        <Button>Create</Button>
                    </Link>
                </div>
                <TableContainer
                    tableOptions={walletsOptions}
                    rows={wallets}
                    tableActionItems={item => tableActionItems(item)}
                    totalAmount={totalAmount}
                />
            </div>
        </div>
    );
};

export default Wallets;
