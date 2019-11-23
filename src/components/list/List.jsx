import React, { Component } from 'react';
import Loading from '../commons/Loading';
import Pagination from './Pagination';
import Table from './Table';

import { handleResponse } from '../../helper';
import { API_URL } from '../../config';

class List extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      currencies: [],
      error: null,
      totalPages: 0,
      page: 1,
    };

    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  fetchCurrencies() {
    this.setState({ loading: true });

    const { page } = this.state;

    fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=10`)
      .then(handleResponse)
      .then((data) => {
        const { currencies, totalPages } = data;
        this.setState({
          loading: false,
          currencies,
          totalPages,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.errorMessage,
          loading: false
        });
      });
  }

  handlePaginationClick(direction) {
    let nextPage = this.state.page;
    nextPage = direction === 'next' ? nextPage+1 : nextPage-1;
    this.setState({ page: nextPage }, () => {
      this.fetchCurrencies();
    });
  }

  render() {
    const {
      error,
      loading,
      currencies,
      totalPages,
      page,
    } = this.state;

    if (loading) {
      // render only loading, if the state is set to true
      return <div className="loading-container"><Loading /></div>;
    }

    if (error) {
      // show error if something went wrong on fetching data
      return <div className="error">{error}</div>;
    }

    return (
      <div>
        <Table currencies={currencies} />
        <Pagination
          page={page}
          totalPages={totalPages}
          handlePaginationClick={this.handlePaginationClick}
        />
      </div>
    );
  }
}

export default List;
