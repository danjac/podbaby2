import React, { PropTypes, Component } from 'react';

import { fetchCategory } from '../../actions/category';
import CategoryDetail from '../../components/CategoryDetail';

export class Category extends Component {

  componentDidMount() {
    this.fetchCategory(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.fetchCategory(nextProps.params.id);
    }
    return nextProps;
  }

  fetchCategory(id) {
    this.props.dispatch(fetchCategory(id));
  }

  render() {
    return <CategoryDetail {...this.props} />;
  }
}

Category.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
};

export default Category;
