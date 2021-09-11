const { check } = require('express-validator');

const usersValidator = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Valid email is required').isEmail(),
  check('password', 'Enter a password with 6 or more characters').isLength({
    min: 6,
  }),
];

module.exports = usersValidator;
