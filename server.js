import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.json({ response: 'ok' });
});

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
