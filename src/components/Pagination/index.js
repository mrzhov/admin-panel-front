import React, {Component} from 'react';
import ReactPagination from 'react-paginate';

import {withRouter} from 'react-router-dom';

import {getQueryString, pushHistory} from '../../lib/functions';

import './Pagination.scss';

const ITEMS_COUNT = 20;

class Pagination extends Component {
  pushHistory = pushHistory.bind(this);

  changePage({ selected }) {
    if (!Number.isNaN(selected)) {
      const page = selected + 1;
      this.pushHistory({ page }, true);
    }
  }

  render() {
    const { count } = this.props;

    if (!count || count <= ITEMS_COUNT) return null;

    let initialPage = 1;
    const page = getQueryString('page');
    if (page === 1) initialPage = 0;
    else initialPage = page - 1;

    return (
      <ReactPagination
          activeClassName='active'
          containerClassName='pagination'
          previousClassName='previous'
          initialPage={initialPage}
          marginPagesDisplayed={1}
          nextClassName='next'
          onPageChange={this.changePage}
          pageCount={Math.ceil(count / ITEMS_COUNT)}
          pageRangeDisplayed={4}
      />
    );
  }
}

export default withRouter(Pagination);
