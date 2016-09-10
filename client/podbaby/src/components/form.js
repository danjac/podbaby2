import React from 'react';
import {
  partial,
  isEmpty,
  mapValues
} from 'lodash';


export default function (Component, fields, onSubmit) {
  /*
   * Higher order component for managing form validation state
   *
   * */

  return class extends React.Component {

    constructor(props) {
      super(props);

      this.state = this.getFormDefaults();
      this.handleSubmit = this.handleSubmit.bind(this);
      this.resetForm = this.resetForm.bind(this);

      this.handlers = Object.keys(fields).reduce((handlers, field) => {
        handlers[field] = partial(this.handleChange, field).bind(this);
        return handlers;
      }, {});
    }

    getFormDefaults() {
      const values = mapValues(fields, field => field.defaultValue);

      return {
        values: values,
        touched: [],
        errors: {},
        formSubmitted: false,
      };
    }

    resetForm() {
      this.setState(this.getFormDefaults());
    }

    handleSubmit(event) {
      event.preventDefault();
      this.setState({
        formSubmitted: true
      });
      Object.keys(fields).forEach(field => {
        if (!this.isTouched(field)) {
          this.validate(field, this.state.values[field]);
        }
      });
      // tbd: "validateAll" method
      if (!isEmpty(this.state.errors)) {
        return;
      }
      onSubmit(this.props, this.state.values, this.resetForm);
    }

    handleChange(field, event) {
      if (!this.isTouched(field)) {
        const {
          touched
        } = this.state;
        touched.push(field);
        this.setState({
          touched
        });
      }
      this.validate(field, event.target.value);
    }

    isTouched(field) {
      return this.state.touched.indexOf(field) > -1;
    }

    validate(field, value) {

      const {
        values,
        errors
      } = this.state;
      const required = fields[field] && fields[field].required;

      const error = (!required || value) ? false : 'You must provide a value';

      if (error) {
        errors[field] = error;
      } else {
        delete errors[field];
      }

      values[field] = value;

      this.setState({
        values,
        errors
      });
    }

    getValidationState(field) {
      return this.state.errors[field] ? 'error' : 'success';
    }

    render() {

      const {
        formSubmitted
      } = this.state;

      const validators = Object.keys(fields).reduce((validators, field) => {
        validators[field] = formSubmitted || this.isTouched(field) ? this.getValidationState(field) : null;
        return validators;
      }, {});

      const newProps = {
        resetForm: this.resetForm,
        values: this.state.values,
        errors: this.state.errors,
        handlers: this.handlers,
        onSubmit: this.handleSubmit,
        formSubmitted,
        validators,
      }
      return <Component {...this.props} {...newProps} />
    }
  }

}
