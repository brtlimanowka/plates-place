const mongoose = require('mongoose');

const WorkoutSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  name: { type: String, required: true },
  muscleGroup: { type: String },
  bar: {
    name: { type: String, required: true },
    weight: { type: Number, required: true },
  },
  totalWeight: { type: Number },
});

module.exports = mongoose.model('workout', WorkoutSchema);
