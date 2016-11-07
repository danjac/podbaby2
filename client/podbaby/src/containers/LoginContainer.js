import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reduxForm } from 'redux-form';
import { routerShape } from 'react-router/lib/PropTypes';

import * as api from '../api';
import { fetchAuthenticatedUser } from '../actions/auth';
import { loginValidator } from '../validators';
import LoginForm from '../components/LoginForm';

export class LoginContainer extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(fields) {
    console.log('SUBMITTING', fields);

    const { router, dispatch } = this.props;

    return api.auth.login(fields)
      .then(({ token }) => {
        dispatch(fetchAuthenticatedUser(token));
        router.push('/');
      });
  }

  render() {

    const { handleSubmit } = this.props;
    const onSubmit = handleSubmit(this.handleSubmit);

    return <LoginForm onSubmit={onSubmit} {...this.props} />;
  }

}

LoginContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  router: routerShape,
  handleSubmit: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default connect()(reduxForm({
  form: 'login',
  validate: loginValidator,
})(withRouter(LoginContainer)));
