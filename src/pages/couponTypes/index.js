import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useCouponTypesApi from '../../api/couponTypesApi';
import Button from '../../components/Button';
import { getQueryString } from '../../lib/functions';
import routes from '../../route/routes';
import TableContainer from "../../components/TableContainer";
import { couponTypesOptions } from "../../lib/tableOptions";

const CouponTypesPage = ({ history }) => {
    const couponTypesApi = useCouponTypesApi();
    const { page } = getQueryString();

    const couponTypes = useSelector(state => state.couponTypes.list);
    const totalAmount = useSelector(state => state.couponTypes.totalAmount);
    const userRole = useSelector(state => state.user.role);
    const sortConfig = useSelector(state => state.commonFlags.sortConfig)

    useEffect(() => {
        getCouponTypes();
    }, [page, sortConfig]);

    const getCouponTypes = useCallback(() => {
        couponTypesApi.getCouponTypes({ page, ...sortConfig });
    }, [page, sortConfig]);

    const tableActionItems = item => {
        if (userRole && userRole === 'Admin') {
            return (
                [
                    {
                        icon: 'edit',
                        tooltipText: 'Change coupon type',
                        onClick: () =>
                            history.push(
                                routes.couponTypePage.path.replace(':id', item._id)
                            )
                    },
                    {
                        icon: 'delete',
                        tooltipText: 'Remove coupon type',
                        onClick: () =>
                            window.confirm('Do you really want to delete the couponType?') &&
                            couponTypesApi.deleteCouponType(item._id, getCouponTypes)
                    }
                ]
            )
        }
        return []
    }
    return (
        <div className='mainPage'>
            <div className='mainPage__wrapper'>
                <div className='mainPage__header'>
                    <h3>Coupon Types</h3>
                    {userRole && userRole === 'Admin' && (
                        <Link to={routes.couponTypePage.path.replace(':id', 'new')}>
                            <Button>Create</Button>
                        </Link>
                    )}
                </div>
                <TableContainer
                    tableOptions={couponTypesOptions}
                    rows={couponTypes}
                    tableActionItems={item => tableActionItems(item)}
                    totalAmount={totalAmount}
                />
            </div>
        </div>
    );
};

export default CouponTypesPage;
