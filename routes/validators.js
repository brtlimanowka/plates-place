const { check } = require('express-validator');

const users = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Valid email is required').isEmail(),
  check('password', 'Enter a password with 6 or more characters').isLength({
    min: 6,
  }),
];

const auth = [
  check('email', 'Valid email is required').isEmail(),
  check('password', 'Password is required').exists(),
];

module.exports = { usersValidator: users, authValidator: auth };
