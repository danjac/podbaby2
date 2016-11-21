import React, { PropTypes, Component } from 'react';
import * as bs from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import SearchForm from '../SearchForm';
import Loader from '../Loader';
import EpisodeList from '../EpisodeList';

class Bookmarks extends Component {

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

        <bs.Breadcrumb>
          <LinkContainer to="/podcasts/me/">
            <bs.Breadcrumb.Item>My podcasts</bs.Breadcrumb.Item>
          </LinkContainer>
          <bs.Breadcrumb.Item active>Bookmarks</bs.Breadcrumb.Item>
        </bs.Breadcrumb>

        <SearchForm placeholder="Search for podcasts" {...this.props} />

        <EpisodeList ifEmpty={ifEmpty}
                     {...this.props} />
      </div>
    );
  }
}

Bookmarks.propTypes = {
  searchQuery: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default Bookmarks;
