import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchAllEpisodes } from '../actions/episodes';
import { episodesSelector } from '../selectors';
import { episodeActionPropTypes } from '../prop-types';
import Episodes from '../components/Episodes';

import { bindEpisodeActions } from './utils';

export class EpisodesContainer extends Component {

  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind();
    this.handleClearSearch = this.handleClearSearch.bind(this);
    this.handleSelectPage = this.handleSelectPage.bind(this);
  }

  componentDidMount() {
    const { page, q } = this.props.location.query;
    this.fetchEpisodes(page || 1, q);
  }

  componentWillReceiveProps(nextProps) {

    const thisQuery = this.props.location.query;
    const nextQuery = nextProps.location.query;

    if (thisQuery !== nextQuery) {
      const { page, q } = nextQuery;
      this.fetchEpisodes(page, q);
    }
  }

  fetchEpisodes(page = 1, searchQuery) {
    const { onFetchEpisodes } = this.props;
    onFetchEpisodes(page, searchQuery);
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

    const searchQuery = this.props.location.query && this.props.location.query.q;

    return <Episodes onSearch={this.handleSearch}
                     onClearSearch={this.handleClearSearch}
                     onSelectPage={this.handleSelectPage}
                     searchQuery={searchQuery}
                     {...this.props} />;
  }
}

EpisodesContainer.propTypes = {
  episodes: PropTypes.array.isRequired,
  next: PropTypes.number,
  previous: PropTypes.number,
  loading: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  onFetchEpisodes: PropTypes.func.isRequired,
  ...episodeActionPropTypes,
};


const mapStateToProps = state => {
  const {
    auth: { authenticated },
    episodes: {
      next,
      previous,
      loading,
    },
  } = state;

  return {
    episodes: episodesSelector(state),
    authenticated,
    next,
    previous,
    loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({
      onFetchEpisodes: fetchAllEpisodes,
    }, dispatch),
    ...bindEpisodeActions(dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(EpisodesContainer));
