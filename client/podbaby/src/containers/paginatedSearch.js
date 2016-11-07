import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { routerShape, locationShape } from 'react-router/lib/PropTypes';

export const paginatedSearch = (WrappedComponent, fetchData) => {

  class HOC extends Component {

    constructor(props) {
      super(props);
      this.handleSearch = this.handleSearch.bind(this);
      this.handleClearSearch = this.handleClearSearch.bind(this);
      this.handleSelectPage = this.handleSelectPage.bind(this);
    }

    componentDidMount() {
      const { page, q } = this.props.location.query;
      this.fetch(page || 1, q, this.props.params);
    }

    componentWillReceiveProps(nextProps) {

      const thisQuery = this.props.location.query;
      const nextQuery = nextProps.location.query;

      if (thisQuery !== nextQuery || this.props.params !== nextProps.params) {
        const { page, q } = nextQuery;
        this.fetch(page, q, nextProps.params);
      }

      return nextProps;
    }

    fetch(page, searchQuery, params) {
      fetchData(this.props.dispatch, page, searchQuery, params);
    }

    changeLocation(nextQuery) {
      const query = {...this.props.location.query, ...nextQuery };
      this.props.router.replace({...this.props.location, query });
    }

    handleSearch(searchQuery) {
      this.changeLocation({ page: 1, q: searchQuery });
    }

    handleClearSearch() {
      this.changeLocation({ page: 1, q: '' });
    }

    handleSelectPage(page) {
      this.changeLocation({ page });
    }


    render() {
      const { location: { query } } = this.props;
      const searchQuery = query && query.q;

      return <WrappedComponent searchQuery={searchQuery}
                               onSearch={this.handleSearch}
                               onClearSearch={this.handleClearSearch}
                               onSelectPage={this.handleSelectPage} {...this.props} />;
    }

  }

  HOC.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    location: locationShape.isRequired,
    router: routerShape.isRequired,
  };

  return HOC;

};

export default function(fetchData) {
  return WrappedComponent => connect()(paginatedSearch(WrappedComponent, fetchData));
}
