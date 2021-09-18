const express = require('express');
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
                process.env.JWT_SECRET,
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
