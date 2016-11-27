import React, { PropTypes } from 'react';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';

import { episodeShape } from '../../propTypes';

import SearchForm from '../SearchForm';
import Loader from '../Loader';
import EpisodesNav from '../EpisodesNav';
import EpisodeList from '../EpisodeList';

import './index.css';

const HistoryPage = props => {

  const {
    loading,
    episodes,
    onClearHistory,
    searchQuery,
  } = props;

  if (loading) {
    return <Loader />;
  }


  const ifEmpty = searchQuery ? 'Sorry, no results found for your search' : "You don't have any podcasts in your history";
  const notEmpty = episodes.length > 0;

  return (
    <div>
      <EpisodesNav />
      <SearchForm placeholder="Search for podcasts" {...props} />

      {notEmpty && (
        <bs.Button className="form-control clear-history"
                   onClick={onClearHistory}>
          <Icon name="trash" /> Clear history
        </bs.Button>)}

      <EpisodeList ifEmpty={ifEmpty} {...props} />
    </div>
  );
};

HistoryPage.propTypes = {
  searchQuery: PropTypes.string,
  episodes: PropTypes.arrayOf(episodeShape).isRequired,
  loading: PropTypes.bool.isRequired,
  onClearHistory: PropTypes.func.isRequired,
};

export default HistoryPage;
