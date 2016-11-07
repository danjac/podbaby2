import validate from 'validate.js';

export const validator = constraints => {
  // creates a validator function
  // ensure we always return object, for redux-form compat
  // (validate returns null)
  return values => {
    return validate(values, constraints) || {};
  };
};
