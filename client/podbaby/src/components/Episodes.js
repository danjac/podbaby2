import React, { PropTypes, Component } from 'react';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';

import { episodeActionPropTypes } from '../propTypes';

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
      canUpdate,
      onSearch,
      onClearSearch,
      onSelectPage,
      onUpdate,
      searchQuery,
    } = this.props;

    if (loading) {
      return <Loader />;
    }

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

       {canUpdate && (
        <bs.Button className="form-control"
                   onClick={onUpdate}
                   bsStyle="default">
          <Icon name="refresh" /> Update</bs.Button>)}

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
  authenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  canUpdate: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onSelectPage: PropTypes.func.isRequired,
  ...episodeActionPropTypes,
};

export default Episodes;
