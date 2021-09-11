const express = require('express');
const router = express.Router();
const validators = require('./validators');
const { validationResult } = require('express-validator');
const User = require('../models/User');

// @route   POST api/settings
// @desc    Create settings for user
// @access  Private
router.post('/', validators.settingsValidator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
});

// @route   PUT api/settings
// @desc    Update user's settings
// @access  Private

// @route   GET api/settings
// @desc    Get user's settings
// @access  Private

module.exports = router;
