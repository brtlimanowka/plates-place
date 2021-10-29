const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const path = require('path');
const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/workout', require('./routes/workout'));

// app.use('/api/day', require('./routes/day'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontapp/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontapp', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
