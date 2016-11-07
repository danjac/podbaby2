import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';


export class SearchForm extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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

  render() {
    const {
      placeholder,
      searchQuery,
      onClearSearch,
    } = this.props;

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
       {searchQuery && onClearSearch &&
       <bs.FormGroup>
        <bs.Button className="form-control"
                   type="submit"
                   onClick={onClearSearch}
                   bsStyle="default">
          <Icon name="refresh" /> Show all
        </bs.Button>
       </bs.FormGroup>}
      </form>
    );
  }
}

SearchForm.propTypes = {
  placeholder: PropTypes.string,
  searchQuery: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired,
};

export default SearchForm;
