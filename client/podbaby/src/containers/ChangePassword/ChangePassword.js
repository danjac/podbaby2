import React, { PropTypes, Component } from 'react';
import * as api from '../../api';
import { success } from '../../actions/alerts';
import ChangePasswordForm from '../../components/ChangePasswordForm';

export class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(fields) {

    const { dispatch, reset } = this.props;
    const { password } = fields;

    return api.auth.changePassword(password)
      .then(() => {
        dispatch(success('Your password has been updated.'));
        reset();
      });

  }

  render() {

    const { handleSubmit } = this.props;
    const onSubmit = handleSubmit(this.handleSubmit);

    return <ChangePasswordForm onSubmit={onSubmit} {...this.props} />;
  }

}

ChangePassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ChangePassword;
