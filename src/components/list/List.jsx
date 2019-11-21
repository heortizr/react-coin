import React, { Component } from 'react';
import Loading from '../commons/Loading';
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
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    fetch(`${API_URL}/cryptocurrencies?page=1&perPage=20`)
      .then(handleResponse)
      .then((data) => {
        this.setState({
          currencies: data.currencies,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.errorMessage,
          loading: false
        });
      });
  }

  renderChangePercent(percent) {
    if (percent > 0) {
      return <span className="percent-raised">{percent}% &uarr;</span>
    } else if (percent < 0) {
      return <span className="percent-fallen">{percent}% &darr;</span>
    } else {
      return <span>{percent}%</span>
    }
  }

  render() {
    const { loading, error, currencies } = this.state;

    if (loading) {
      // render only loading, if the state is set to true
      return <div className="loading-container"><Loading /></div>;
    }

    if (error) {
      // show error if something went wrong on fetching data
      return <div className="error">{error}</div>;
    }

    return (
      <Table
        currencies={currencies}
        renderChangePercent={this.renderChangePercent}
      />
    );
  }
}

export default List;
