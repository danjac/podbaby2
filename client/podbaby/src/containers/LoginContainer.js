import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reduxForm } from 'redux-form';

import * as api from '../api';
import { fetchUser } from '../actions/auth';
import { success } from '../actions/alerts';
import Login from '../components/Login';

export class LoginContainer extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(fields) {

    const { router, dispatch } = this.props;

    return api.auth.login(fields)
      .then(({ token }) => {
        // make this a separate action e.g. fetchAuthenticatedUser()
        // dispatch success in action
        dispatch(fetchUser(token));
        dispatch(success('Welcome back!'));
        router.push('/');
      });
  }

  render() {

    const { handleSubmit } = this.props;
    const onSubmit = handleSubmit(this.handleSubmit);

    return <Login onSubmit={onSubmit} {...this.props} />;
  }

}

LoginContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default connect()(reduxForm({
  form: 'login',
})(withRouter(LoginContainer)));
