import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import useCoupons from '../api/couponsApi';
import Button from '../components/Button';
import Table from '../components/Table';
import TableActions from '../components/TableActions';
import {getQueryString} from '../lib/functions';
import routes from '../route/routes';

const Coupons = () => {
    const couponsApi = useCoupons();
    const {page} = getQueryString();

    const coupons = useSelector(state => state.coupons.list);
    const totalCoupons = useSelector(state => state.coupons.totalAmount);
    const authUserRole = useSelector(state => state.authUser.role)

    const [sortConfig, setSortConfig] = useState({
        sortField: '',
        sortDirection: ''
    });

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

    const getActionRemoveCoupon = coupon => (
        <TableActions
            items={[
                {
                    icon: 'delete',
                    tooltipText: 'Remove coupon',
                    onClick: () =>
                        window.confirm('Do you really want to remove the coupon?') &&
                        couponsApi.deleteCoupon(coupon._id, getCoupons)
                }
            ]}
        />
    )

    return (
        <div className='mainPage'>
            <div className='mainPage__wrapper'>
                <div className='mainPage__header'>
                    <h3>Coupons</h3>
                    <Link to={routes.couponPage.path.replace(':id', 'new')}>
                        <Button>Generate</Button>
                    </Link>
                </div>

                <Table
                    options={[
                        {
                            name: 'code',
                            value: 'Code'
                        },
                        {
                            name: 'price',
                            value: 'Price in dollars',
                            className: 'tableBoldFont'
                        },
                        {
                            name: 'priceYuan',
                            value: 'Price in yuan',
                            className: 'tableBoldFont'
                        },
                        {
                            name: 'limit',
                            value: 'Limit'
                        },
                        {
                            name: 'duration',
                            value: 'Duration'
                        },
                        {
                            name: 'ownerName',
                            value: 'Owner'
                        },
                        {
                            name: 'creatorName',
                            value: 'Creator'
                        },
                        {
                            name: 'createdAt',
                            value: 'Created'
                        },
                        {
                            name: 'activatedAt',
                            value: 'Activated'
                        },
                        {
                            name: 'gamerName',
                            value: 'GamerName'
                        },
                        {
                            name: 'actions',
                            value: ''
                        }
                    ]}
                    rows={Array.from(coupons).map(coupon => ({
                        ...coupon,
                        price: `${Math.floor(coupon.price)}$`,
                        priceYuan: `${Math.floor(coupon.priceYuan)} yuan`,
                        duration: `${coupon.duration} days`,
                        createdAt: new Date(coupon.createdAt).toLocaleString(),
                        activatedAt: coupon.isActivated
                            ? coupon.activatedAt
                                ? new Date(coupon.activatedAt).toLocaleString()
                                : 'Activated'
                            : 'Not activated',
                        gamerId: coupon.isActivated
                            ? coupon.gamerId
                            : 'Not activated',
                        gamerName: coupon.isActivated
                            ? coupon.gamerName
                            : 'Not activated',
                        actions: (
                            authUserRole === 'Admin'
                                ? getActionRemoveCoupon(coupon)
                                : !coupon.isActivated && getActionRemoveCoupon(coupon)
                        )
                    }))}
                    // sort={true}
                    // filter={!!filterValue}
                    // totalAmount={totalCoupons}
                    // setSortingField={config => setSortConfig(config)}
                    // parentSortConfig={sortConfig}
                />
            </div>
        </div>
    );
};

export default Coupons;
