import React, { PropTypes, Component } from 'react';

import { episodeActionPropTypes } from '../prop-types';

import Search from './Search';
import Loader from './Loader';
import EpisodeList from './EpisodeList';

class Episodes extends Component {

  render() {

    const {
      episodes,
      next,
      previous,
      authenticated,
      loading,
      onSearch,
      onClearSearch,
      onSelectPage,
      location: {
        query,
      },
    } = this.props;

    if (loading) {
      return <Loader />;
    }

    const searchQuery = query.q;

    const ifEmpty = searchQuery && 'No podcasts found for your search.';

    return (
      <div>
        <div className="page-header">
          <h2>All Podcasts</h2>
        </div>
        <Search placeholder="Search for podcasts"
                searchQuery={searchQuery}
                onClear={onClearSearch}
                onSearch={onSearch} />

        <EpisodeList episodes={episodes}
                     next={next}
                     previous={previous}
                     ifEmpty={ifEmpty}
                     authenticated={authenticated}
                     onSelectPage={onSelectPage}
                     {...this.props} />
      </div>
    );
  }
}

Episodes.propTypes = {
  episodes: PropTypes.array.isRequired,
  next: PropTypes.number,
  previous: PropTypes.number,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired,
  onSelectPage: PropTypes.func.isRequired,
  ...episodeActionPropTypes,
};

export default Episodes;
