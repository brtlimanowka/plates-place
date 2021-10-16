const express = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const router = express.Router();
const uuid = require('uuid');
const User = require('../models/User');
const Settings = require('../models/Settings');
const validators = require('./validators');
const Mailer = require('../mailer/Mailer');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', validators.usersValidator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  User.findOne({ email })
    .then((result) => {
      if (result) {
        return res.status(400).json({ message: 'Email already in use' });
      } else {
        let manageString = uuid.v4();
        let user = new User({ name, email, password, manageString });
        bcrypt
          .genSalt()
          .then((salt) => bcrypt.hash(password, salt))
          .then((hashedPassword) => {
            user.password = hashedPassword;
            user.save().then(() => {
              let settings = new Settings({ user });
              settings.save();

              const mailer = new Mailer(user);
              mailer.sendActivationEmail(req.header('host'));
              return res.status(201).json({ message: 'Success' });
            });
          })
          .catch((error) => {
            console.error(error.message);
            res.status(500).send('Server Error');
          });
      }
    })
    .catch((error) => {
      console.error(error.message);
      res.status(500).send('Server Error');
    });
});

// @route   GET api/users/:email
// @desc    Checks if a user exist
// @access  Public
router.get('/:email', (req, res) => {
  let email = Buffer.from(req.params.email, 'base64').toString();
  User.findOne({ email }).then((result) => {
    if (result) {
      res.json({ found: true });
    } else {
      res.json({ found: false });
    }
  });
});

// @route   GET api/users
// @desc    Activate a user
// @access  Private
router.get('/activate/:manageString', (req, res) => {
  let manageString = req.params.manageString;
  User.findOneAndUpdate(
    { manageString },
    { active: true, manageString: null },
    (error, ignored) => {
      if (error) {
        res.status(500).json({ message: 'Server error' });
      } else {
        res
          .status(200)
          .send(
            "Your account has been activated! You can close this window and log in to Plates' Place"
          );
      }
    }
  );
});

// @route   POST api/users/reset
// @desc    Change a user's password
// @access  Private
router.post('/reset', validators.passwordValidator, (req, res) => {
  const { password, manageString } = req.body;

  bcrypt
    .genSalt()
    .then((salt) => bcrypt.hash(password, salt))
    .then((hashedPassword) => {
      User.findOneAndUpdate(
        { manageString },
        { password: hashedPassword, manageString: null },
        (error, ignored) => {
          if (error) {
            res.status(500).json({ message: 'Server error' });
          } else {
            res.sendStatus(200);
          }
        }
      );
    })
    .catch((error) => {
      console.error(error.message);
      res.status(500).send('Server Error');
    });
});

module.exports = router;
