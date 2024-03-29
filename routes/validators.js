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

const passwordResetRequest = [
  check('email', 'Valid email is required').isEmail(),
];

const newPassword = [check('email', 'Password is required').exists()];

const settings = [
  check('bars', 'Bars is required').exists(),
  check('weights', 'Weights is required').exists(),
];
const workout = [
  check('user', 'User is required').exists(),
  check('name', 'Name is required').exists(),
];
const day = [];

module.exports = {
  usersValidator: users,
  authValidator: auth,
  resetValidator: passwordResetRequest,
  passwordValidator: newPassword,
  settingsValidator: settings,
  workoutValidator: workout,
  dayValidator: day,
};
