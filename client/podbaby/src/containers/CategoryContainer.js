import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchCategory, fetchChannelsForCategory } from '../actions/category';
import { channelsSelector } from '../selectors';

import CategoryDetail from '../components/CategoryDetail';

import withPaginatedSearch from './withPaginatedSearch';

import { bindChannelActionCreators } from './utils';

export class CategoryContainer extends Component {

  componentDidMount() {
    this.fetchCategory(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.fetchCategory(nextProps.params.id);
    }
    return nextProps;
  }

  fetchCategory(id) {
    this.props.dispatch(fetchCategory(id));
  }

  render() {
    return <CategoryDetail {...this.props} />;
  }
}

CategoryContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
  const {
    auth: { authenticated },
    category: {
      category,
      error,
      next,
      previous,
    },
  } = state;

  const categoryLoading = state.category.loading;
  const channelsLoading = state.channels.loading;

  return {
    channels: channelsSelector(state),
    category,
    authenticated,
    next,
    previous,
    error,
    channelsLoading,
    categoryLoading,
  };
};

const mapDispatchToProps = dispatch => bindChannelActionCreators(dispatch);

const fetchChannels = (dispatch, page, searchQuery, { id }) => dispatch(
  fetchChannelsForCategory(id, page, searchQuery)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(withPaginatedSearch(fetchChannels)(CategoryContainer)));
