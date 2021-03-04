import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TableContainer from "../../components/TableContainer";
import Button from '../../components/Button';
import useDepositsApi from '../../api/depositsApi';
import routes from '../../route/routes';
import { getQueryString } from '../../lib/functions';
import { envConfig } from "../../lib/configs/env";
import { depositsOptions } from "../../lib/tableOptions";

const adminApi = envConfig[process.env.NODE_ENV].adminApi

const DepositsPage = ({ history }) => {
    const depositsApi = useDepositsApi();
    const { page } = getQueryString();

    const deposits = useSelector(state => state.deposits.list);
    const totalAmount = useSelector(state => state.deposits.totalAmount);
    const sortConfig = useSelector(state => state.commonFlags.sortConfig)

    useEffect(() => {
        getDeposits();
    }, [page, sortConfig]);

    const getDeposits = useCallback(() => {
        depositsApi.getDeposits({ page, ...sortConfig });
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
                    tableOptions={depositsOptions}
                    rows={deposits}
                    tableActionItems={item => tableActionItems(item)}
                    totalAmount={totalAmount}
                />
            </div>
        </div>
    );
};

export default DepositsPage;
