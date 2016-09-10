import React from 'react';
import validate from 'validate.js';
import {
  partial,
  isEmpty,
  isFunction,
} from 'lodash';


export default function(Component, defaults, constraints, onSubmit, asyncConstraints) {
  /*
   * Higher order component for managing form validation state
   *
   * */
  // add further arg for asyncConstraints

  const fields = Object.keys(defaults);

  return class extends React.Component {

    constructor(props) {
      super(props);

      this.state = this.getFormDefaults();
      this.handleSubmit = this.handleSubmit.bind(this);
      this.resetForm = this.resetForm.bind(this);

      this.handlers = fields.reduce((handlers, field) => {
        handlers[field] = partial(this.handleChange, field).bind(this);
        return handlers;
      }, {});
    }

    getFormDefaults() {
      // we might want to pass in defaults as function
      // e.g. defaults = props => props.user

      let values;
      if (isFunction(defaults)) {
        values = defaults(this.props);
      } else {
        values = defaults;
      }
      return {
        values,
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

      if (!isEmpty(this.state.errors)) {
        return;
      }

      this.setState({
        formSubmitted: true
      });

      // validate everything
      let errors = validate(this.state.values, constraints);
      if (!isEmpty(errors)) {
        this.setState({ errors });
        return;
      }

      if (asyncConstraints) {
        validate.async(this.state.values, asyncConstraints)
          .then(() => {
            onSubmit(this.props, this.state.values, this.resetForm);
          }, errors => {
            this.setState({ errors });
          });
      } else {
        onSubmit(this.props, this.state.values, this.resetForm);
      }
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


      const localConstraints = { [field]: constraints[field] };

      let error = validate({ [field]: value }, localConstraints);

      if (error) {
        errors[field] = error[field];
      } else {
        delete errors[field];
      }

      values[field] = value;

      this.setState({
        values,
        errors,
      });
    }

    getValidationState(field) {
      return this.state.errors[field] ? 'error' : 'success';
    }

    render() {

      const {
        formSubmitted
      } = this.state;

      const validators = fields.reduce((validators, field) => {
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
