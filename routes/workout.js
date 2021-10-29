const express = require('express');
const router = express.Router();
const validators = require('./validators');
const { validationResult } = require('express-validator');
const Workout = require('../models/Workout');

// @route   POST api/workout
// @desc    Create a Workout
// @access  Private
router.post('/', validators.workoutValidator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { user, name, muscleGroup, bar, weights } = req.body;
  let workout = new Workout({ user, name, muscleGroup, bar, weights });
  workout
    .save()
    .then((result) => res.status(201).json(result))
    .catch((error) => {
      console.error(error);
      return res.status(500).send('Server Error');
    });
});

module.exports = router;