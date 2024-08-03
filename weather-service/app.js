const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { weather: null, error: null });
});

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.render('index', { weather: null, error: 'Please enter a city name.' });
  }

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: city,
        appid: OPENWEATHER_API_KEY,
        units: 'metric' // Use 'metric' for Celsius, 'imperial' for Fahrenheit
      }
    });

    if (response.data.cod !== 200) {
      return res.render('index', { weather: null, error: 'City not found.' });
    }

    const weatherData = response.data;
    const weather = {
      city: weatherData.name,
      country: weatherData.sys.country,
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
    };

    res.render('index', { weather, error: null });
  } catch (error) {
    console.error(error);
    res.render('index', { weather: null, error: 'Error retrieving weather data.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
