import React, { useState, useEffect } from 'react';
import './style.css'; // Import CSS file for styling
 
const WeatherDisplay = ({ weatherData }) => {
  const iconBaseUrl = 'http://openweathermap.org/img/wn/';
  const iconExtension = '@4x.png';
 
  // Map weather condition to icon
  const getIconUrl = (iconCode) => {
    return `${iconBaseUrl}${iconCode}${iconExtension}`;
  };
 
  return (
    <div className="weather-info">
      <div>Weather: {weatherData.weather[0].main}</div>
      <img src={getIconUrl(weatherData.weather[0].icon)} alt="Weather Icon" />
      {/* Add more weather information here */}
    </div>
  );
};
 
const App = () => {
  const [weatherData, setWeatherData] = useState(undefined);
  const [cityName, setCityName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
 
  const getWeather = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=c34324957c087a7a3f6c753a4a1e2eea`);
      const data = await res.json();
      if (data.cod === 200) {
        setWeatherData(data);
        setError('');
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error fetching weather data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
 
  // useEffect(() => {
  //   if (cityName !== '') {
  //     getWeather();
  //   }
  // }, [cityName]);
 
  return (
    <div className="app">
      <div className="container">
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={getWeather}>Check</button>
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        {(weatherData && !error) && <WeatherDisplay weatherData={weatherData} />}
      </div>
    </div>
  );
};
 
export default App;