import React, { useState } from 'react';
import './App.css';
// weather icons 
import { FaTemperatureHigh, FaWind } from 'react-icons/fa';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi'; 

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const getWeatherIcon = (code) => {
  switch (code) {
    case 0:
      return <WiDaySunny size={48} color="#f39c12" />;
    case 1:
    case 2:
    case 3:
      return <WiCloudy size={48} color="#7f8c8d" />;
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return <WiRain size={48} color="#3498db" />;
    case 71:
    case 73:
    case 75:
    case 77:
      return <WiSnow size={48} color="#ecf0f1" />;
    case 95:
      return <WiThunderstorm size={48} color="#34495e" />;
    default:
      return <WiDaySunny size={48} color="#f39c12" />;
  }
};


  const fetchWeather = async () => {
    const fetchWeather = async () => {
      if (!city) return;
      setLoading(true);
      try {
        // Fetch logic...
      } catch (error) {
        // Error handling...
      } finally {
        setLoading(false);
      }
    };

  try {
    // Fetch coordinates for city using geocoding API
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      alert('City not found');
      setWeather(null);
      return;
    }

    const { latitude, longitude, name } = geoData.results[0];

    // Fetch current weather for coordinates
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherRes.json();

    setWeather({
      city: name,
      temperature: weatherData.current_weather.temperature,
      windspeed: weatherData.current_weather.windspeed,
      weathercode: weatherData.current_weather.weathercode,
      time: weatherData.current_weather.time,
    });
  } catch (error) {
    alert('Error fetching weather data');
    setWeather(null);
  }
};

  return (
    <div className="App">
      {/* <h1>Weather Now</h1> */}
      {/* <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      /> */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Check Weather</button>
      </div>
      {loading && <div className="loader"></div>}

      {/* <button onClick={fetchWeather}>Check Weather</button> */}

     {weather && (
        <div className="weather-info fade-in">
          <h2>{weather.city}</h2>
          <div>{getWeatherIcon(weather.weathercode)}</div>
          <p><FaTemperatureHigh /> Temperature: {weather.temperature} °C</p>
          <p><FaWind /> Wind Speed: {weather.windspeed} km/h</p>
          <p>Time: {new Date(weather.time).toLocaleString()}</p>
        </div>
      )}
     </div>
  );
}

export default App;
