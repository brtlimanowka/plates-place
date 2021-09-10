const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({ response: 'ok' });
});

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
