import React, { PropTypes, Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';

import { episodeShape } from '../../propTypes';

import SearchForm from '../SearchForm';
import Loader from '../Loader';
import EpisodeList from '../EpisodeList';

class History extends Component {

  render() {

    const {
      loading,
      episodes,
      onClearHistory,
      searchQuery,
    } = this.props;

    if (loading) {
      return <Loader />;
    }

    const ifEmpty = searchQuery ? 'Sorry, no results found for your search' : "You don't have any podcasts in your history";
    const notEmpty = episodes.length > 0;

    return (
      <div>
        <bs.Breadcrumb>
          <LinkContainer to="/podcasts/me/">
            <bs.Breadcrumb.Item>My podcasts</bs.Breadcrumb.Item>
          </LinkContainer>
          <bs.Breadcrumb.Item active>History</bs.Breadcrumb.Item>
        </bs.Breadcrumb>

        <SearchForm placeholder="Search for podcasts" {...this.props} />

        {notEmpty && (
          <bs.Button className="form-control clear-history"
                     onClick={onClearHistory}>
            <Icon name="trash" /> Clear history
          </bs.Button>)}

        <EpisodeList ifEmpty={ifEmpty} {...this.props} />
      </div>
    );
  }
}

History.propTypes = {
  searchQuery: PropTypes.string,
  episodes: PropTypes.arrayOf(episodeShape).isRequired,
  loading: PropTypes.bool.isRequired,
  onClearHistory: PropTypes.func.isRequired,
};

export default History;
