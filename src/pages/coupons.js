import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import useCoupons from '../api/couponsApi';
import Button from '../components/Button';
import { getQueryString } from '../lib/functions';
import routes from '../route/routes';
import { couponOptions } from "../lib/tableOptions";
import TableContainer from "../components/TableContainer";

const Coupons = () => {
    const couponsApi = useCoupons();
    const { page } = getQueryString();

    const coupons = useSelector(state => state.coupons.list);
    const totalAmount = useSelector(state => state.coupons.totalAmount);
    const authUserRole = useSelector(state => state.authUser.role)
    const sortConfig = useSelector(state => state.commonFlags.sortConfig)

    useEffect(() => {
        getCoupons();
    }, [page, sortConfig]);

    const getCoupons = useCallback(() => {
        couponsApi.getCoupons({
            page,
            sortField: sortConfig.sortField,
            sortDirection: sortConfig.sortDirection
        })
    }, [page, sortConfig]);

    const tableActionItems = item => {
        const actionsArr = [
            {
                icon: 'delete',
                tooltipText: 'Remove coupon',
                onClick: () =>
                    window.confirm('Do you really want to remove the coupon?') &&
                    couponsApi.deleteCoupon(item._id, getCoupons)
            }
        ]
        if (authUserRole !== 'Admin') {
            if (item.isActivated) {
                return []
            } else {
                return actionsArr
            }
        }
        return actionsArr
    }

    return (
        <div className='mainPage'>
            <div className='mainPage__wrapper'>
                <div className='mainPage__header'>
                    <h3>Coupons</h3>
                    <Link to={routes.couponPage.path.replace(':id', 'new')}>
                        <Button>Generate</Button>
                    </Link>
                </div>
                <TableContainer
                    tableOptions={couponOptions}
                    rows={coupons}
                    tableActionItems={item => tableActionItems(item)}
                    totalAmount={totalAmount}
                />
            </div>
        </div>
    );
};

export default Coupons;
