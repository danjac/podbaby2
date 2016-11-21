import React, { PropTypes, Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import * as bs from 'react-bootstrap';

import { categoryShape } from '../../propTypes';
import Loader from '../Loader';
import { sanitize } from '../utils';


class Categories extends Component {

  render() {

    const { loading, categories } = this.props;

    if (loading) {
      return <Loader />;
    }

    return (
      <div>
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

Categories.propTypes = {
  categories: PropTypes.arrayOf(categoryShape).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Categories;
