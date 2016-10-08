import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';


export class Search extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleClick(event) {
    event.target.select();
  }

  handleSearch(event) {
    event.preventDefault();
    const query = findDOMNode(this.refs.search).value.trim();
    if (query) {
      this.props.onSearch(query);
    }
  }

  handleClear(event) {
    event.preventDefault();
    this.props.onClear();
  }

  render() {
    const { placeholder, searchQuery, onClear } = this.props;

    return (
      <form onSubmit={this.handleSearch}>
        <bs.FormGroup>
          <bs.FormControl type="search"
                          ref="search"
                          onClick={this.handleClick}
                          defaultValue={searchQuery}
                          placeholder={placeholder} />
        </bs.FormGroup>
        <bs.FormGroup>
          <bs.Button className="form-control"
                   type="submit"
                   bsStyle="primary">
            <Icon name="search" /> Search
          </bs.Button>
       </bs.FormGroup>
       {searchQuery && onClear &&
       <bs.FormGroup>
        <bs.Button className="form-control"
                   type="submit"
                   onClick={this.handleClear}
                   bsStyle="default">
          <Icon name="refresh" /> Show all
        </bs.Button>
       </bs.FormGroup>}
      </form>
    );
  }
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  searchQuery: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Search;
