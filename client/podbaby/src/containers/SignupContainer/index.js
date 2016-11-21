import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reduxForm } from 'redux-form';
import { routerShape } from 'react-router/lib/PropTypes';

import * as api from '../../api';
import { fetchAuthenticatedUser } from '../../actions/auth';
import { signupValidator } from '../../validators';
import SignupForm from '../../components/SignupForm';

export class SignupContainer extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(fields) {

    const { router, dispatch } = this.props;

    return api.auth.signup(fields)
      .then(({ token }) => {
        dispatch(fetchAuthenticatedUser(token, true));
        router.push('/');
      });
  }

  render() {

    const { handleSubmit } = this.props;
    const onSubmit = handleSubmit(this.handleSubmit);

    return <SignupForm onSubmit={onSubmit} {...this.props} />;
  }

}

SignupContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  router: routerShape,
  handleSubmit: PropTypes.func.isRequired,
};

export default connect()(reduxForm({
  form: 'signup',
  validate: signupValidator,
})(withRouter(SignupContainer)));
