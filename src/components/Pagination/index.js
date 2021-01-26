import React, { Component } from 'react';
import ReactPagination from 'react-paginate';
import { withRouter } from 'react-router-dom';

import { getQueryString, pushHistory } from '../../lib/functions';

import './style.scss';

const ITEMS_COUNT = 20;

const Pagination = ({ count, history }) => {
    const changePage = ({ selected }) => {
        if (!Number.isNaN(selected)) {
            const page = selected + 1;
            pushHistory({ page }, true, history);
        }
    }

    if (!count || count <= ITEMS_COUNT) return null;

    const page = getQueryString('page');
    const initialPage = page === 1 ? 0 : page - 1;

    return (
        <ReactPagination
            activeClassName='active'
            containerClassName='pagination'
            previousClassName='previous'
            initialPage={initialPage}
            marginPagesDisplayed={1}
            nextClassName='next'
            onPageChange={changePage}
            pageCount={Math.ceil(count / ITEMS_COUNT)}
            pageRangeDisplayed={4}
        />
    );
}

export default withRouter(Pagination);
