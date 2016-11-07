import { validator } from './utils';

export const loginValidator = validator({
  username: {
    presence: true,
  },
  password: {
    presence: true,
  },
});
