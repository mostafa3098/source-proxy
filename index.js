const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('eSign Source Proxy');
});

app.get('/proxy', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing URL');

  try {
    const response = await fetch(url);
    const data = await response.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  } catch (err) {
    res.status(500).send('Error fetching URL');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
