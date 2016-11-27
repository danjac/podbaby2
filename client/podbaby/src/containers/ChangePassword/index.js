import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { passwordValidator } from '../../validators';

import ChangePassword from './ChangePassword';

export default connect()(reduxForm({
  form: 'changePassword',
  validate: passwordValidator,
})(ChangePassword));
