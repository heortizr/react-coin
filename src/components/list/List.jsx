import React, { Component } from 'react';
import Loading from '../commons/Loading';

import { handleResponse } from '../../helper';
import { API_URL } from '../../config';

import './Table.css';

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
    const { loading, error } = this.state;

    // render only loading, if the state is set to true
    if (loading) {
      return (
        <div className="loading-container"><Loading /></div>
      );
    }

    // show error if something went wrong on fetching data
    if (error) {
      return (
        <div className="error">{error}</div>
      );
    }

    return (
      <div className="Table-container">
        <table className="Table">
          <thead className="Table-head">
            <tr>
              <th>Cryptocurrency</th>
              <th>Price</th>
              <th>Market Cap</th>
              <th>24H Change</th>
            </tr>
          </thead>
          <tbody className="Table-body">
          {this.state.currencies.map((currency) => (
            <tr key={currency.id}>
              <td>
                <span className="Table-rank">{currency.rank}</span>
                {currency.name}
              </td>
              <td>
                <span className="Table-dollar">$ {currency.price}</span>
              </td>
              <td>
                <span className="Table-dollar">$ {currency.marketCap}</span>
              </td>
              <td>
                {this.renderChangePercent(currency.percentChange24h)}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default List;
