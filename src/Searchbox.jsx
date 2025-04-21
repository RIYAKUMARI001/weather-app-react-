import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Searchbox.css';

export default function Searchbox({ update }) {
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
  const API_KEY = 'f44d1070acc104cbef2ded0fb8153cf9';

  const [city, setCity] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const getWeather = async () => {
    try {
      const response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      const jsonResponse = await response.json();

      if (!response.ok) {
        throw new Error('City not found');
      }

      return {
        city: city,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };
    } catch (error) {
      setError(true);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newInfo = await getWeather();
    if (newInfo) {
      update(newInfo);
      setError(false);
    }
    setCity('');
  };

  return (
    <div className="searchbox">
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        <br />
        <br />
        <Button variant="contained" type="submit">
          Search
        </Button>
        {error && <h3 style={{ color: 'red' }}>City not found</h3>}
      </form>
    </div>
  );
}//openweathermap.org/current
