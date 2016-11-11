import React, { PropTypes, Component } from 'react';
import * as bs from 'react-bootstrap';

import SearchForm from './SearchForm';
import Loader from './Loader';
import ChannelList from './ChannelList';

class Channels extends Component {

  render() {

    const {
      loading,
      header,
      searchQuery,
    } = this.props;

    if (loading) {
      return <Loader />;
    }

    const ifEmpty = searchQuery && 'Sorry, no results found for your search';

    return (
      <div>
        <bs.PageHeader>{header}</bs.PageHeader>
        <SearchForm placeholder="Search for feeds" {...this.props} />
        <ChannelList ifEmpty={ifEmpty} {...this.props} />
      </div>
    );
  }
}

Channels.propTypes = {
  loading: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string,
  header: PropTypes.string.isRequired,
};

export default Channels;
