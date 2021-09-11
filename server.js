const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.json({ response: 'ok' });
});

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
// app.use('/api/settings', require('./routes/settings'));
// app.use('/api/workout', require('./routes/workout'));
// app.use('/api/day', require('./routes/day'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
