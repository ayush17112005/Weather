import React from 'react';
import './Header.css';

const Header = ({ weather }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="app-name">Weather App</h1>
        {weather && (
          <div className="weather-info">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
              className="weather-icon"
            />
            <div className="weather-details">
              <span className="temperature">
                {(weather.main.temp - 273.15).toFixed(1)}°C
              </span>
              <span className="city-name">{weather.name}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
