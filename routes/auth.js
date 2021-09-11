const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');
const validators = require('./validators');
const User = require('../models/User');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', (req, res) => {
  res.json({ description: 'Get logged in user' });
});
// @route   POST api/auth
// @desc    Auth user and get token
// @access  Public
router.post('/', validators.authValidator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  User.findOne({ email })
    .then((result) => {
      if (!result) {
        return res.status(400).json({ message: 'Email not found' });
      }
      bcrypt
        .compare(password, result.password)
        .then((match) => {
          if (!match) {
            return res.status(400).json({ message: 'Invalid credentials' });
          } else {
            const payload = {
              user: {
                id: result.id,
              },
            };
            jwt.sign(
              payload,
              config.get('jwtSecret'),
              {
                expiresIn: 3600,
              },
              (error, token) => {
                if (error) {
                  throw error;
                } else {
                  res.status(201).json({ token });
                }
              }
            );
          }
        })
        .catch((error) => {
          console.error(error.message);
          res.status(500).send('Server Error');
        });
    })
    .catch((error) => {
      console.error(error.message);
      res.status(500).send('Server Error');
    });
});

module.exports = router;
