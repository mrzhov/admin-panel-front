import React from 'react';

import Table from '../Table';
import TableActions from '../TableActions';

const TableContainer = ({tableOptions, rows, tableActionItems, totalAmount, setSortConfig, sortConfig}) => {
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
        <Table
            options={tableOptions}
            rows={Array.from(rows).map(item => ({
                ...item,
                balance: `${Math.floor(item.balance)}$`,
                minBalance: `${Math.floor(item.minBalance)}$`,
                couponDiscount: item.promo ? transformCouponDiscount(item) : '',
                isSuper: item.isSuper ? "yes" : "no",
                duration: `${item.duration} days`,
                price: `${Math.floor(item.price)}$`,
                priceYuan: `${Math.floor(item.priceYuan)} yuan`,
                createdAt: new Date(item.createdAt).toLocaleString(),
                activatedAt: item.isActivated
                    ? item.activatedAt
                        ? new Date(item.activatedAt).toLocaleString()
                        : 'Activated'
                    : 'Not activated',
                gamerName: item.isActivated
                    ? item.gamerName
                    : 'Not activated',
                actions: (
                    <TableActions items={tableActionItems(item)}/>
                )
            }))}
            sort={true}
            totalAmount={totalAmount}
            setSortingField={config => setSortConfig(config)}
            parentSortConfig={sortConfig}
        />
    );
};

export default TableContainer;
