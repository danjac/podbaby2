import React, { PropTypes, Component } from 'react';

import SearchForm from '../SearchForm';
import Loader from '../Loader';
import ChannelList from '../ChannelList';

class ChannelsPage extends Component {

  render() {

    const {
      loading,
      searchQuery,
    } = this.props;

    if (loading) {
      return <Loader />;
    }

    const ifEmpty = searchQuery && 'Sorry, no results found for your search';

    return (
      <div>
        <SearchForm placeholder="Search for feeds" {...this.props} />
        <ChannelList ifEmpty={ifEmpty} {...this.props} />
      </div>
    );
  }
}

ChannelsPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string,
};

export default ChannelsPage;
