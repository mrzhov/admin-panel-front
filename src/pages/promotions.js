import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '../components/Button';
import { getQueryString } from '../lib/functions';
import routes from '../route/routes';
import usePromotions from "../api/promotionsApi";
import TableContainer from "../components/TableContainer";
import { promotionsOptions } from "../lib/tableOptions";

const Promotions = ({ history }) => {
    const promotionsApi = usePromotions();
    const { page } = getQueryString();

    const promotions = useSelector(state => state.promotions.list);
    const totalAmount = useSelector(state => state.promotions.totalAmount);
    const sortConfig = useSelector(state => state.commonFlags.sortConfig)

    useEffect(() => {
        getPromotions();
    }, [page, sortConfig]);

    const getPromotions = useCallback(() => {
        promotionsApi.getPromotions({ page, ...sortConfig });
    }, [page, sortConfig]);

    const tableActionItems = item => [
        {
            icon: 'edit',
            tooltipText: 'Change promo',
            onClick: () =>
                history.push(
                    routes.promoPage.path.replace(':id', item._id)
                )
        },
        {
            icon: 'delete',
            tooltipText: 'Remove promo',
            onClick: () =>
                window.confirm('Do you really want to delete the promo?') &&
                promotionsApi.deletePromo(item._id, getPromotions)
        }
    ]

    return (
        <div className='mainPage'>
            <div className='mainPage__wrapper'>
                <div className='mainPage__header'>
                    <h3>Promotions</h3>
                    <Link to={routes.promoPage.path.replace(':id', 'new')}>
                        <Button>Create</Button>
                    </Link>
                </div>
                <TableContainer
                    tableOptions={promotionsOptions}
                    rows={promotions}
                    tableActionItems={item => tableActionItems(item)}
                    totalAmount={totalAmount}
                />
            </div>
        </div>
    );
};

export default Promotions;
