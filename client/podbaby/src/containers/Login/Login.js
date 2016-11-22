import React, { PropTypes, Component } from 'react';
import { routerShape } from 'react-router/lib/PropTypes';

import * as api from '../../api';
import { fetchAuthenticatedUser } from '../../actions/auth';
import LoginForm from '../../components/LoginForm';

class Login extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(fields) {

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

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  router: routerShape,
  handleSubmit: PropTypes.func.isRequired,
};

export default Login;
