const mongoose = require('mongoose');

const DaySchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  name: { type: String, required: true, unique: true },
  muscleGroup: { type: String },
  workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'workout' }],
});

module.exports = mongoose.model('day', DaySchema);
