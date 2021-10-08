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

const passwordReset = [check('email', 'Valid email is required').isEmail()];

const settings = [check('user', 'User is required').not().isEmpty()];
const workout = [];
const day = [];

module.exports = {
  usersValidator: users,
  authValidator: auth,
  resetValidator: passwordReset,
  settingsValidator: settings,
  workoutValidator: workout,
  dayValidator: day,
};
