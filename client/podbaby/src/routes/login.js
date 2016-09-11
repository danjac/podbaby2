import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import * as bs from 'react-bootstrap';

import * as api from '../api';
import { setAuthToken } from '../storage';
import validator from '../validate';
import { formControl } from '../components/form';
import { getCurrentUser } from '../modules/auth';
import { success, warning } from '../modules/alerts';


class Login extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit({username, password}) {
    return api.post('/api-token-auth/', {
        username,
        password
      })
      .then(response => {
        if (response.errors) {
          this.props.actions.warning('Sorry, could not log you in');
          throw new SubmissionError(response.errors);
        }
        setAuthToken(response.token);
        this.props.actions.getCurrentUser();
        this.props.actions.success('Welcome back!');
        this.props.router.push("/");
      });

  }

  render() {

    const { submitting, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
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
    );
  }
}


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

