import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reduxForm } from 'redux-form';

import { loginValidator } from '../../validators';

import Login from './Login';

export default connect()(reduxForm({
  form: 'login',
  validate: loginValidator,
})(withRouter(Login)));
