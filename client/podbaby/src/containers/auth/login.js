import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import * as bs from 'react-bootstrap';

import * as api from '../../api/auth';
import { setAuthToken } from '../../utils/storage';
import validator from '../../utils/validate';
import { formControl } from '../../components/form';
import { getCurrentUser } from '../../modules/auth';
import { success, warning } from '../../modules/alerts';


export class Login extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit({ username, password }) {
    return api.login(username, password)
      .then(({ token }) => {
        setAuthToken(token);
        this.props.actions.getCurrentUser();
        this.props.actions.success('Welcome back!');
        this.props.router.push("/");
      });

  }

  render() {

    const { submitFailed, submitting, handleSubmit } = this.props;

    return (
      <div>
        <bs.PageHeader>Login</bs.PageHeader>
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        {submitFailed && <bs.Alert bsStyle="warning">Sorry, unable to log you in</bs.Alert>}
        <Field name="username"
               component={formControl}
               placeholder="Username"
               type="text" />
        <Field name="password"
               component={formControl}
               placeholder="Password"
               type="password" />
        <bs.Button bsStyle="primary"
                   disabled={submitting}
                   className="form-control"
                   type="submit">Login</bs.Button>
      </form>
      </div>
    );
  }
}

Login.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  router: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};


const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({
      getCurrentUser,
      success,
      warning,
    }, dispatch)
  };
};

const constraints = {
  username: {
    presence: true,
  },
  password: {
    presence: true,
  }
};
export default connect(null, mapDispatchToProps)(reduxForm({
  form: 'login',
  validate: validator(constraints),
})(withRouter(Login)));

