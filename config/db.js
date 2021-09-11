const mongoose = require('mongoose');
const config = require('config');
require('dotenv').config();
const db = config.get('mongoURI') || process.env.MONGO_URI;

const connectDB = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('  Connected to database');
    })
    .catch((error) => {
      console.error(error.message);
      process.exit(1);
    });
};

module.exports = connectDB;
