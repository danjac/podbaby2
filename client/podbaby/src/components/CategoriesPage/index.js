import React, { PropTypes, Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import * as bs from 'react-bootstrap';

import { categoryShape } from '../../propTypes';

import ChannelsNav from '../ChannelsNav';
import Loader from '../Loader';
import { sanitize } from '../utils';


class CategoriesPage extends Component {

  render() {

    const { loading, categories } = this.props;

    if (loading) {
      return <Loader />;
    }

    return (
      <div>
        <ChannelsNav />
        <bs.ListGroup>
          {categories.map(category => (
            <LinkContainer to={`/feeds/browse/${category.id}/`} key={category.id}>
              <bs.ListGroupItem dangerouslySetInnerHTML={sanitize(category.name)} />
            </LinkContainer>
          ))}
        </bs.ListGroup>
      </div>
    );

  }
}

CategoriesPage.propTypes = {
  categories: PropTypes.arrayOf(categoryShape).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CategoriesPage;
