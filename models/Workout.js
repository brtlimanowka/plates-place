const mongoose = require('mongoose');

const WorkoutSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  name: { type: String, required: true, unique: true },
  muscleGroup: { type: String },
  bar: {
    name: { type: String, required: true },
    weight: { type: Number, required: true },
  },
  weights: [
    {
      name: { type: String, required: true },
      weight: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model('workout', WorkoutSchema);
