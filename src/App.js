import React, { useState, useEffect } from 'react';
import './styles.css';
import Lottie from 'lottie-react';
import clear from './assets/clear.json';
import cloudy from './assets/cloudy.json';
import rain from './assets/rain.json';
import snowing from './assets/snowing.json';
import thunderstorm from './assets/thunder-storm.json';
import fogmist from './assets/fog-mist.json';
import backgroundImage from './assets/bg.jpeg';

const WelcomePage = ({ onSubmit, showWelcome }) => {
  const [location, setLocation] = useState('');

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleManualSubmit = () => {
    onSubmit(location);
  };

  return (
    <div style={{ display: showWelcome ? 'block' : 'none' }}>
      <h2 style={{ fontFamily: '' }}>Welcome to My Weather App!</h2>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="Enter Location"
          style={{
            padding: '10px',
            fontSize: '16px',
            marginRight: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            outline: 'none',
          }}
        />
        <button
          onClick={handleManualSubmit}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            background: 'linear-gradient(to right, #FF416C, #FF4B2B)',
            color: 'white',
            borderRadius: '5px',
            border: 'none',
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleLocationSubmit = async (location) => {
    try {
      setLoading(true);
      const apiKey = '9c5a069d9dffc22243a6e2309834ac45';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      setWeatherData(data);
      setLoading(false);
      setShowWelcome(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (weatherData) {
      const mainWeather = weatherData.weather[0].main;
      if (mainWeather === 'Clear') {
        setWeather(clear);
      } else if (mainWeather === 'Clouds') {
        setWeather(cloudy);
      } else if (mainWeather === 'Rain' || mainWeather === 'Drizzle') {
        setWeather(rain);
      } else if (mainWeather === 'Thunderstorm') {
        setWeather(thunderstorm);
      } else if (mainWeather === 'Snow') {
        setWeather(snowing);
      } else if (mainWeather === 'Fog' || mainWeather === 'Mist' || mainWeather=="Haze") {
        setWeather(fogmist);
      }
    }
  }, [weatherData]);

  return (
    <div className="App">
      <WelcomePage onSubmit={handleLocationSubmit} showWelcome={showWelcome} />
      {loading ? <div>Loading...</div> : (
        <div className="lottie-container">
          {weather && (
  <h1 style={{
    maxWidth: '500px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    margin: '0 auto',
  }}>
    Current Weather at {weatherData.name}: {weatherData.weather[0].main}
  </h1>
)}

{weather && (
  <h1 style={{
    maxWidth: '500px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    margin: '0 auto',
  }}>
    The Current temperature outside is: {Math.round(weatherData.main.temp-273.15)}°C
  </h1>
)}
          <Lottie animationData={weather} style={{ width: '450px', height: '400px' }} />
        </div>
      )}
<footer style={{padding: '10px', textAlign: 'center', position: 'fixed', bottom: 0, marginLeft:50}}><h2>Made by Sumedh Akula</h2></footer>    </div>
  );
}

export default App;











