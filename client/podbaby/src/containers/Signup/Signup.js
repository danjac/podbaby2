import React, { PropTypes, Component } from 'react';
import { routerShape } from 'react-router/lib/PropTypes';

import * as api from '../../api';
import { fetchAuthenticatedUser } from '../../actions/auth';
import SignupForm from '../../components/SignupForm';

export class Signup extends Component {

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

Signup.propTypes = {
  dispatch: PropTypes.func.isRequired,
  router: routerShape,
  handleSubmit: PropTypes.func.isRequired,
};

export default Signup;
