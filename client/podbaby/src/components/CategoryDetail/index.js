import React, { PropTypes, Component } from 'react';
import * as bs from 'react-bootstrap';

import { categoryShape } from '../../propTypes';

import SearchForm from '../SearchForm';
import Loader from '../Loader';
import ChannelList from '../ChannelList';
import NotFound from '../NotFound';

import './index.css';

class CategoryDetail extends Component {

  render() {

    const {
      category,
      categoryLoading,
      channelsLoading,
      searchQuery,
      error,
    } = this.props;

    if (error) {
      return <NotFound />;
    }

    if (categoryLoading || !category) {
      return <Loader />;
    }

    const ifEmpty = searchQuery ? 'Sorry, no results found for your search' : 'No feeds found for this category';

    const channels = channelsLoading ? <Loader /> : (
      <div>
        <SearchForm placeholder="Search for feeds" {...this.props} />
        <ChannelList ifEmpty={ifEmpty} {...this.props} />
      </div>
    );

    return (
      <div>
        <bs.PageHeader>{category.name}</bs.PageHeader>
        {channels}
      </div>
    );
  }
}

CategoryDetail.propTypes = {
  category: categoryShape,
  error: PropTypes.object,
  searchQuery: PropTypes.string,
  categoryLoading: PropTypes.bool.isRequired,
  channelsLoading: PropTypes.bool.isRequired,
};

export default CategoryDetail;
