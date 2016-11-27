import React, { PropTypes, Component } from 'react';
import { routerShape } from 'react-router/lib/PropTypes';

import * as api from '../../api';
import { success } from '../../actions/alerts';
import RecoverPasswordForm from '../../components/RecoverPasswordForm';

class RecoverPassword extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(fields) {

    const { router, dispatch } = this.props;
    const { username } = fields;

    return api.auth.recoverPassword(username)
      .then(() => {
        dispatch(success('Check your email for your new password and sign in.'));
        router.push('/login/');
      });
  }

  render() {

    const { handleSubmit } = this.props;
    const onSubmit = handleSubmit(this.handleSubmit);

    return <RecoverPasswordForm onSubmit={onSubmit} {...this.props} />;
  }

}

RecoverPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
  router: routerShape,
  handleSubmit: PropTypes.func.isRequired,
};

export default RecoverPassword;
