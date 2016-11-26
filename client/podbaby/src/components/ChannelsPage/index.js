import React, { PropTypes, Component } from 'react';
import * as bs from 'react-bootstrap';

import SearchForm from '../SearchForm';
import Loader from '../Loader';
import ChannelList from '../ChannelList';

class ChannelsPage extends Component {

  render() {

    const {
      title,
      loading,
      searchQuery,
    } = this.props;

    if (loading) {
      return <Loader />;
    }

    const ifEmpty = searchQuery && 'Sorry, no results found for your search';

    return (
      <div>
        <bs.PageHeader>{title}</bs.PageHeader>
        <SearchForm placeholder="Search for feeds" {...this.props} />
        <ChannelList ifEmpty={ifEmpty} {...this.props} />
      </div>
    );
  }
}

ChannelsPage.propTypes = {
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string,
};

export default ChannelsPage;
