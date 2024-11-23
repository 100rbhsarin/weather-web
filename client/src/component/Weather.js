import { useState } from 'react';
import axios from 'axios';

import './Weather.css';


function Weather() {
  const [city, setCity] = useState('Ranchi');
  const [weather, setWeather] = useState(null);

  const handleSearch = async () => {
    const response = await axios.get(`https://mycityclimet-api.onrender.com/weather/:${city}`);
    const data = response.data;
    const { name, region, country, localtime} = data.location;
    const { text: conditionText, icon } = data.current.condition;
    const { wind_kph, temp_c, humidity, cloud } = data.current;
    const weatherData = { name, region, country, localtime, conditionText, icon, wind_kph, temp_c, humidity, cloud };
    setWeather(weatherData);
  };

  return (
    <>
    <div className="weather-container">
      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      {weather && (
        <div className="weather-details">
          <h2>{weather.name}, {weather.region}, {weather.country}</h2>
          <h3>{weather.localtime}</h3>
          <div className="weather-info">
            <div className="weather-condition">
              <p>{weather.conditionText}</p>
              <img src={`http:${weather.icon}`} alt={weather.conditionText} />
            </div>
            <div className="weather-stats">
              <p>Wind Speed: {weather.wind_kph} kph</p>
              <p>Temperature: {weather.temp_c}°C</p>
              <p>Humidity: {weather.humidity}%</p>
              <p>Cloud Cover: {weather.cloud}%</p>

            </div>
          </div>
        </div>
    
         
      )}
  
    </div>
    </>

  );
}

export default Weather;
