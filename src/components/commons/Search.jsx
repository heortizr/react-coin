import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Loading from './Loading';
import { handleResponse } from '../../helper';
import { API_URL } from '../../config';
import './Search.css';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      searchQuery: '',
      searchResult: [],
    };
  
    this.handleChange = this.handleChange.bind(this);
    // this.renderSearchResult = this.renderSearchResult.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleChange(event) {
    const searchQuery = event.target.value;
    this.setState({ searchQuery });

    // to avoid fetch when search query is missing
    if (!searchQuery) {
      return '';
    }

    this.setState({ loading: true });
    fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
      .then(handleResponse)
      .then((searchResult) => {
        this.setState({
          searchResult,
          loading: false,
        });
      });
  }

  handleRedirect(currencyId) {
    // clear state before redirct
    // to selected result
    this.setState({
      searchQuery: '',
      searchResult: [],
    });

    this.props.history.push(`/currency/${currencyId}`);
  }

  renderSearchResult() {
    const { searchResult, searchQuery, loading } = this.state;

    if (!searchQuery) {
      return '';
    }

    if (searchResult.length > 0) {
      return (
        <div className="Search-result-container">
          {searchResult.map((result) => (
            <div
              key={result.id}
              className="Search-result"
              onClick={() => this.handleRedirect(result.id)}
            >
              {result.name} ({result.symbol})
            </div>
          ))}
        </div>
      );
    }

    if (!loading) {
      return (
        <div className="Search-result-container">
          <div className="Search-no-result">
            No result found
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="Search" >
        <span className="Search-icon" />
        <input
          type="text"
          className="Search-input"
          placeholder="Currency name"
          onChange={this.handleChange}
          value={this.state.searchQuery}
        />
        {this.state.loading &&
          <div className="Search-loading">
            <Loading
              width='12px'
              height='12px'
            />
          </div>
        }

        {this.renderSearchResult()}
        </div>
    )
  }
}

export default withRouter(Search);
