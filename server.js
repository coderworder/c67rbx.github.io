// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/games', async (req, res) => {
  try {
    const response = await fetch('https://api.rolimons.com/games/v1/gamelist');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
