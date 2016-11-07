import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { routerShape } from 'react-router/lib/PropTypes';

import { logout } from '../actions/auth';
import Navbar from '../components/Navbar';

export class NavContainer extends Component {

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

NavContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  router: routerShape,
  user: PropTypes.object,
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
)(withRouter(NavContainer));
