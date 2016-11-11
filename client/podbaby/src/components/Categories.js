import React, { PropTypes, Component } from 'react';
import * as bs from 'react-bootstrap';

import { categoryShape } from '../propTypes';
import Loader from './Loader';
import { sanitize } from './utils';


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
          <bs.ListGroupItem key={category.id}
                            href="#"
                            dangerouslySetInnerHTML={sanitize(category.name)} />
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
