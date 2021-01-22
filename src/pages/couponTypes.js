import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import useCouponTypes from '../api/couponTypesApi';
import Button from '../components/Button';
import Table from '../components/Table';
import TableActions from '../components/TableActions';
import {getQueryString} from '../lib/functions';
import routes from '../route/routes';

const CouponTypes = ({history}) => {
    const couponTypesApi = useCouponTypes();
    const {page} = getQueryString();

    const couponTypes = useSelector(state => state.couponTypes.list);
    const totalCouponTypes = useSelector(state => state.couponTypes.totalAmount);
    const authUserRole = useSelector(state => state.authUser.role);

    const [sortConfig, setSortConfig] = useState({
        sortField: '',
        sortDirection: ''
    });

    useEffect(() => {
        getCouponTypes();
    }, [page, sortConfig]);

    const getCouponTypes = useCallback(() => {
        couponTypesApi.getCouponTypes({
            page,
            sortField: sortConfig.sortField,
            sortDirection: sortConfig.sortDirection
        });
    }, [page, sortConfig]);

    return (
        <div className='mainPage'>
            <div className='mainPage__wrapper'>
                <div className='mainPage__header'>
                    <h3>Coupon Types</h3>
                    {authUserRole && authUserRole === 'Admin' && (
                        <Link to={routes.couponTypePage.path.replace(':id', 'new')}>
                            <Button>Create</Button>
                        </Link>
                    )}
                </div>

                <Table
                    options={[
                        {
                            name: 'limit',
                            value: 'Limit'
                        },
                        {
                            name: 'duration',
                            value: 'Duration'
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
                            name: 'description',
                            value: 'Description'
                        },
                        {
                            name: 'actions',
                            value: ''
                        }
                    ]}
                    rows={couponTypes.map(couponType => ({
                        ...couponType,
                        duration: `${couponType.duration} days`,
                        price: `${Math.floor(couponType.price)}$`,
                        priceYuan: `${Math.floor(couponType.priceYuan)} yuan`,
                        actions: authUserRole && authUserRole === 'Admin' && (
                            <TableActions
                                items={[
                                    {
                                        icon: 'edit',
                                        tooltipText: 'Change coupon type',
                                        onClick: () =>
                                            history.push(
                                                routes.couponTypePage.path.replace(':id', couponType._id)
                                            )
                                    },
                                    {
                                        icon: 'delete',
                                        tooltipText: 'Remove coupon type',
                                        onClick: () =>
                                            window.confirm('Do you really want to delete the couponType?') &&
                                            couponTypesApi.deleteCouponType(couponType._id, getCouponTypes)
                                    }
                                ]}
                            />
                        )
                    }))}
                    // sort={true}
                    // filter={!!filterValue}
                    // totalAmount={totalCouponTypes}
                    // setSortingField={config => setSortConfig(config)}
                    // parentSortConfig={sortConfig}
                />
            </div>
        </div>
    );
};

export default CouponTypes;
