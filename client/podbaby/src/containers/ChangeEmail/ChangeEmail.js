import React, { PropTypes, Component } from 'react';
import * as api from '../../api';
import { changeEmail } from '../../actions/auth';
import { success } from '../../actions/alerts';
import ChangeEmailForm from '../../components/ChangeEmailForm';

export class ChangeEmail extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(fields) {

    const { dispatch } = this.props;
    const { email } = fields;

    return api.auth.changeEmail(email)
      .then(() => {
        dispatch(changeEmail(email));
        dispatch(success('Your email address has been updated.'));
      }).catch(error => {
        console.log('error',error);
        throw error;
      });

  }

  render() {

    const { handleSubmit } = this.props;
    const onSubmit = handleSubmit(this.handleSubmit);

    return <ChangeEmailForm onSubmit={onSubmit} {...this.props} />;
  }

}

ChangeEmail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ChangeEmail;
