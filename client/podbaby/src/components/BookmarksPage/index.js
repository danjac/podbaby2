import React, { PropTypes, Component } from 'react';
import * as bs from 'react-bootstrap';

import SearchForm from '../SearchForm';
import Loader from '../Loader';
import EpisodeList from '../EpisodeList';

class BookmarksPage extends Component {

  render() {

    const {
      loading,
      searchQuery,
    } = this.props;

    if (loading) {
      return <Loader />;
    }

    const ifEmpty = searchQuery ? 'Sorry, no results found for your search' : "You don't have any bookmarks";

    return (
      <div>

        <bs.PageHeader>Bookmarks</bs.PageHeader>
        <SearchForm placeholder="Search for podcasts" {...this.props} />

        <EpisodeList ifEmpty={ifEmpty}
                     {...this.props} />
      </div>
    );
  }
}

BookmarksPage.propTypes = {
  searchQuery: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default BookmarksPage;
