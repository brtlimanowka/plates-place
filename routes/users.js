const express = require('express');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const router = express.Router();
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
        let user = new User({ name, email, password });
        bcrypt
          .genSalt()
          .then((salt) => bcrypt.hash(password, salt))
          .then((hashedPassword) => {
            user.password = hashedPassword;
            user.save().then(() => {
              const payload = {
                user: {
                  id: user.id,
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

module.exports = router;
