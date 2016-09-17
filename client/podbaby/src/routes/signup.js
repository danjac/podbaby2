import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { withRouter } from 'react-router';
import * as bs from 'react-bootstrap';

import * as api from '../utils/api';
import { setAuthToken } from '../utils/storage';
import validator from '../utils/validate';
import { getCurrentUser } from '../modules/auth';
import { formControl } from '../components/form';
import { success } from '../modules/alerts';


class Signup extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit({ username, email, password }) {
    return api.post('/api/auth/create/', {
      username,
      email,
      password
    })
    .then(response => {
      if (response.errors) {
        throw new SubmissionError(response.errors);
      }
      setAuthToken(response.token);
      this.props.actions.getCurrentUser();
      this.props.actions.success("Welcome");
      this.props.router.push("/");
    });
  }

  render() {
    const {
      handleSubmit,
      submitting,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>

        <Field name="username"
               component={formControl}
               label="Username"
               type="text" />

        <Field name="email"
               component={formControl}
               label="Email address"
               type="text" />

        <Field name="password"
               component={formControl}
               label="Password"
               type="password" />

        <Field name="confirmPassword"
               component={formControl}
               label="Confirm password"
               type="password" />

        <bs.Button disabled={submitting}
                   bsStyle="primary"
                   className="form-control"
                   type="submit">Signup</bs.Button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({
      success,
      getCurrentUser,
    }, dispatch)
  };
};

const constraints = {
  username: {
    presence: true,
    length: {
      minimum: 6,
      maxium: 30,
    }
  },
  email: {
    presence: true,
    email: true,
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
    }
  },
  confirmPassword: {
    presence: true,
    equality: 'password',
  }
};


export default connect(
  null,
  mapDispatchToProps)(reduxForm({
    form: 'signup',
    validate: validator(constraints),
  })(withRouter(Signup)));
