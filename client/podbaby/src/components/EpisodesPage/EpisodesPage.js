import React, { PropTypes } from 'react';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';

import SearchForm from '../SearchForm';
import Loader from '../Loader';
import EpisodesNav from '../EpisodesNav';
import EpisodeList from '../EpisodeList';

const EpisodesPage = props => {

  const {
    onUpdate,
    searchQuery,
    previous,
    loading,
  } = props;

  if (loading) {
    return <Loader />;
  }

  const ifEmpty = searchQuery && 'Sorry, no results found for your search';
  const showUpdateBtn = !previous && !searchQuery;

  return (
    <div>
      <EpisodesNav />
      <SearchForm placeholder="Search for podcasts" {...props} />

     {showUpdateBtn && (
      <bs.Button className="form-control"
                 onClick={onUpdate}
                 bsStyle="primary">
        <Icon name="refresh" /> Update</bs.Button>)}

      <EpisodeList ifEmpty={ifEmpty} {...props} />
    </div>
  );
};

EpisodesPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string,
  previous: PropTypes.number,
  onUpdate: PropTypes.func.isRequired,
};

export default EpisodesPage;
