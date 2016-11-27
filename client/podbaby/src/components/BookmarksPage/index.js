import React, { PropTypes } from 'react';

import Loader from '../Loader';
import SearchForm from '../SearchForm';
import EpisodesNav from '../EpisodesNav';
import EpisodeList from '../EpisodeList';

const BookmarksPage = props => {

  const {
    loading,
    searchQuery,
  } = props;

  if (loading) {
    return <Loader />;
  }

  const ifEmpty = searchQuery ? 'Sorry, no results found for your search' : "You don't have any bookmarks";

  return (
    <div>
      <EpisodesNav />
      <SearchForm placeholder="Search for podcasts" {...props} />
      <EpisodeList ifEmpty={ifEmpty} {...props} />
    </div>
  );
};

BookmarksPage.propTypes = {
  searchQuery: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default BookmarksPage;
