const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const router = express.Router();
const uuid = require('uuid');
const User = require('../models/User');
const validators = require('./validators');

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
            user
              .save()
              .then(() => res.status(201).json({ message: 'Success' }));
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

module.exports = router;
