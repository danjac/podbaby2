import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reduxForm } from 'redux-form';

import { usernameValidator } from '../../validators';

import RecoverPassword from './RecoverPassword';

export default connect()(reduxForm({
  form: 'recoverPassword',
  validate: usernameValidator,
})(withRouter(RecoverPassword)));
