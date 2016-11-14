import React, { PropTypes, Component } from 'react';

import SearchForm from './SearchForm';
import Loader from './Loader';
import EpisodeList from './EpisodeList';

class History extends Component {

  render() {

    const {
      loading,
      searchQuery,
    } = this.props;

    if (loading) {
      return <Loader />;
    }

    const ifEmpty = searchQuery ? 'Sorry, no results found for your search' : "You don't have any podcasts in your history";
    // TBD: onEmptyHistory button

    return (
      <div>
        <SearchForm placeholder="Search for podcasts" {...this.props} />

        <EpisodeList ifEmpty={ifEmpty}
                     {...this.props} />
      </div>
    );
  }
}

History.propTypes = {
  searchQuery: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default History;
