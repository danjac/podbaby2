import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { emailValidator } from '../../validators';

import ChangeEmail from './ChangeEmail';

const mapStateToProps = state => {
  const {
    auth: {
      user,
    },
  } = state;
  return {
    initialValues: user,
  };
};

export default connect(mapStateToProps)(reduxForm({
  form: 'changeEmail',
  validate: emailValidator,
})(ChangeEmail));
