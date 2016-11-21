import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchCategories } from '../../actions/categories';
import Categories from '../../components/Categories';

export class CategoriesContainer extends Component {

  componentDidMount() {
    this.props.dispatch(fetchCategories());
  }

  render() {
    return <Categories {...this.props} />;
  }
};

CategoriesContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const {
    categories,
    loading,
  } = state.categories;

  return {
    loading,
    categories,
  };
};

export default connect(mapStateToProps)(
  withRouter(CategoriesContainer));
