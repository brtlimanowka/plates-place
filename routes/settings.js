const express = require('express');
const router = express.Router();
const validators = require('./validators');
const { validationResult } = require('express-validator');
const Settings = require('../models/Settings');

// @route   PATCH api/settings
// @desc    Update settings for user
// @access  Private
router.patch('/:id', validators.settingsValidator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let id = req.params.id;
  Settings.findOneAndUpdate(
    { user: id },
    { bars: req.body.bars, weights: req.body.weights },
    { new: true },
    (error, updatedSettings) => {
      if (error) {
        return res.sendStatus(500);
      } else {
        return res.status(200).json(updatedSettings);
      }
    }
  );
});

// @route   GET api/settings
// @desc    Get user's settings
// @access  Private

module.exports = router;
