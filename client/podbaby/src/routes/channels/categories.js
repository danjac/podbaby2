import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import * as bs from 'react-bootstrap';

import sanitize from '../../utils/sanitize';
import Loader from '../../components/loader';
import { fetchCategories } from '../../modules/categories';


export class Categories extends Component {

  componentDidMount() {
    this.props.actions.onFetchCategories();
  }

  render() {

    const { isLoading, categories } = this.props;

    if (isLoading) {
      return <Loader />;
    }

    return (
      <div>
        <bs.PageHeader>Browse categories</bs.PageHeader>
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
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  isLoading: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  const {
    isLoading,
    results,
  } = state.categories;
  return {
    categories: results,
    isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({
      onFetchCategories: fetchCategories,
    }, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Categories));
