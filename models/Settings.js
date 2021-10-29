const mongoose = require('mongoose');

const SettingsSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  bars: [
    {
      name: { type: String, required: true, unique: true },
      weight: { type: Number, required: true },
      barType: { type: String, required: true },
    },
  ],
  weights: [
    {
      name: { type: String, required: true, unique: true },
      weight: { type: Number, required: true },
      count: { type: Number, required: true },
    },
  ],
  deloadPercent: {
    type: Number,
  },
});

module.exports = mongoose.model('settings', SettingsSchema);
