import validate from 'validate.js';

// creates a validator function
// ensure we always return object, for redux-form compat
// (validate returns null)
export const validator = constraints => values => validate(values, constraints) || {};
