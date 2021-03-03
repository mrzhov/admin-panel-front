import React from 'react';

import Table from '../Table';
import TableActions from '../TableActions';

const TableContainer = ({tableOptions = [], rows = [], tableActionItems = () => {}, totalAmount = 0}) => {
    const transformCouponDiscount = (user) => {
        let couponDiscount = `${user.initDiscount}%`;
        if (user.promo) {
            switch (user.promoType) {
                case 'Fixed':
                    couponDiscount = `${user.initDiscount}% -> ${user.couponDiscount}%`;
                    break;
                case 'Additional':
                    couponDiscount = `${user.initDiscount}% -> ${user.initDiscount}% + ${user.promoDiscount}%`;
                    break;
                default:
                    break;
            }
        }
        return couponDiscount;
    }

    return (
        <Table
            options={tableOptions}
            rows={Array.from(rows).map(item => ({
                ...item,
                balance: `${Math.floor(item.balance)}$`,
                minBalance: `${Math.floor(item.minBalance)}$`,
                couponDiscount: transformCouponDiscount(item),
                isSuper: item.isSuper ? "yes" : "no",
                duration: `${item.duration} days`,
                price: `${Math.floor(item.price)}$`,
                amountUsd: `${Math.floor(item.amountUsd)}$`,
                priceYuan: `${Math.floor(item.priceYuan)} yuan`,
                amountCurrency: `${Math.floor(item.amountCurrency)} yuan`,
                discount: `${Math.floor(item.discount)}%`,
                durations: `${Math.floor(item.durations)} days`,
                actsTill: new Date(item.actsTill).toLocaleString(),
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
        />
    );
};

export default TableContainer;
