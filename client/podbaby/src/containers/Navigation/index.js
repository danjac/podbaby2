import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { routerShape } from 'react-router/lib/PropTypes';

import { logout } from '../../actions/auth';
import Navbar from '../../components/Navbar';

export class Navigation extends Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    const { dispatch, router } = this.props;
    dispatch(logout());
    router.replace({ pathname: '/' });
  }

  render() {
    return <Navbar {...this.props} onLogout={this.handleLogout} />;
  }
}

Navigation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  router: routerShape,
};

const mapStateToProps = state => {
  const { auth: { user, authenticated } } = state;
  return {
    user,
    authenticated,
  };
};

export default connect(
  mapStateToProps,
)(withRouter(Navigation));
