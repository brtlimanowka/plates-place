const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  signupDate: {
    type: Date,
    default: Date.now(),
  },
  active: {
    type: Boolean,
    default: false,
  },
  manageString: {
    type: String,
  },
});

module.exports = mongoose.model('user', UserSchema);
