import React, { useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Button, useToast } from '@chakra-ui/react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';


const App = () => {
  // useState hooks to manage city name, weather data, and loading state
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const toast = useToast();

  // Function to handle form submission
  async function handleSubmit(e) {
    setLoading(true);
    setError(false);
    console.log("Submitted");

    try {
      // Clear previous weather data
      setWeather(null);

      // Sending a POST request to the backend with the city name
      const response = await axios.post("http://localhost:3001/weather", { city });
      setWeather(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      setError(true);
      toast({
        title: "Error fetching weather data.",
        description: "Please check the city name and try again.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
      setCity("");
    }
  }

  // Function to handle input changes
  function handleOnChange(e) {
    setCity(e.target.value);
    console.log(e.target.value);
  }

  // Function to convert Kelvin to Celsius
  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
  }

  return (
      <div className='App'>
       <Header weather={weather} />
        <h1 className='app-name'>Weather App</h1>
        <div className='search-bar'>
          <input
            className='city-search'
            type='text'
            placeholder='Enter city name'
            onChange={handleOnChange} 
            value={city}
          />
          <Button className="get-weather-btn" onClick={handleSubmit} size={"sm"}>Get Weather</Button>
        </div>

        {loading && (
          <div className='loading'>
            <Oval
              height={40}
              width={40}
              color='blue'
              ariaLabel='loading'
            />
          </div>
        )}

        {!loading && weather && (
        <div className="weather-info">
          <div className="city-name">
            <h2>
              Weather in {weather.name}
            </h2>

            <div className='icon-temp'>
              <img 
                className='weather-icon'
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              {kelvinToCelsius(weather.main.temp)}
              <sup className="deg">°C</sup>
            </div>
          </div>
          <div className='des-wind'>
            <p>Weather: {weather.weather[0].description}</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}

      {!loading && error && (
        <div className='error'>
          <FontAwesomeIcon icon={faFrown} size='2x' />
          <p>No data available</p>
        </div>
      )}
      <Footer /> 
     </div>
      
  );
}

export default App;
