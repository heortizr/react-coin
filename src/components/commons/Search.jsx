import React, { Component } from 'react';
import Loading from './Loading';
import { handleResponse } from '../../helper';
import { API_URL } from '../../config';
import './Search.css';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      searchQuery: ''
    };
    this.handleChange = this.handleChange.bind(this);
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
      .then((result) => {
        console.log(result);
        this.setState({ loading: false });
      });
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
        />
        {this.state.loading &&
          <div className="Search-loading">
            <Loading
              width='12px'
              height='12px'
            />
          </div>
        }
        </div>
    )
  }
}

export default Search;
