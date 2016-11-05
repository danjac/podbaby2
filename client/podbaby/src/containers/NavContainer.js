import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { logout } from '../actions/auth';
import Navbar from '../components/Navbar';

export class NavContainer extends Component {
  render() {
    return <Navbar {...this.props} />;
  }
}

NavContainer.propTypes = {
  onLogout: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = state => {
  const { auth: { user, authenticated } } = state;
  return {
    user,
    authenticated,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    onLogout: logout,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavContainer);
