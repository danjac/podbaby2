import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reduxForm } from 'redux-form';

import { signupValidator } from '../../validators';

import Signup from './Signup';

export default connect()(reduxForm({
  form: 'signup',
  validate: signupValidator,
})(withRouter(Signup)));
