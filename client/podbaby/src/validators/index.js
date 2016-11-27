import { validator } from './utils';

export const emailValidator = validator({
  email: {
    presence: true,
    email: true,
  },
});

export const passwordValidator = validator({
  password: {
    presence: true,
    length: {
      minimum: 6,
    },
  },
  confirmPassword: {
    presence: true,
    equality: 'password',
  },
});

export const signupValidator = validator({
  username: {
    presence: true,
    length: {
      minimum: 6,
      maxium: 30,
    },
  },
  email: {
    presence: true,
    email: true,
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
    },
  },
  confirmPassword: {
    presence: true,
    equality: 'password',
  },
});

export const loginValidator = validator({
  username: {
    presence: true,
  },
  password: {
    presence: true,
  },
});
