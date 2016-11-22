import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchCategories } from '../../actions/categories';
import CategoriesPage from '../../components/CategoriesPage';

export class Categories extends Component {

  componentDidMount() {
    this.props.dispatch(fetchCategories());
  }

  render() {
    return <CategoriesPage {...this.props} />;
  }
};

Categories.propTypes = {
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
  withRouter(Categories));
