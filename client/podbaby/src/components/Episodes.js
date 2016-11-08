import React, { PropTypes, Component } from 'react';
import * as bs from 'react-bootstrap';
import Icon from 'react-fa';

import { episodesPropTypes, searchPropTypes } from '../propTypes';

import SearchForm from './SearchForm';
import Loader from './Loader';
import EpisodeList from './EpisodeList';

class Episodes extends Component {

  render() {

    const {
      loading,
      header,
      onUpdate,
      searchQuery,
      previous,
    } = this.props;

    if (loading) {
      return <Loader />;
    }

    const ifEmpty = searchQuery && 'Sorry, no results found for your search';
    const showUpdateBtn = !previous && !searchQuery;

    return (
      <div>
        <bs.PageHeader>{header}</bs.PageHeader>
        <SearchForm placeholder="Search for podcasts" {...this.props} />

       {showUpdateBtn && (
        <bs.Button className="form-control"
                   onClick={onUpdate}
                   bsStyle="default">
          <Icon name="refresh" /> Update</bs.Button>)}

        <EpisodeList ifEmpty={ifEmpty} {...this.props} />
      </div>
    );
  }
}

Episodes.propTypes = {
  ...episodesPropTypes,
  ...searchPropTypes,
  loading: PropTypes.bool.isRequired,
  header: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Episodes;
