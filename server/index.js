const express = require('express');
const corsOptions = require('./config/corsOption')
const cors = require('cors');

const app = express();
const port = process.env.PORT || 7000;
const apiKey = '8d9126cc316b4bff9f592921233004';

app.use(cors(corsOptions))


app.get('/weather/:city', async (req, res) => {
  const city = req.params.city;
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
  const { default: fetch } = await import('node-fetch');
  const response = await fetch(url);
  const data = await response.json();
  res.send(data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
