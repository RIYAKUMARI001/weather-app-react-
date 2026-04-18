import { useState } from 'react';
import { Search } from 'lucide-react';
import './Searchbox.css';

export default function Searchbox({ update }) {
  const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
  const FORECAST_API_URL = 'https://api.openweathermap.org/data/2.5/forecast';
  const API_KEY = 'f44d1070acc104cbef2ded0fb8153cf9';

  const [city, setCity] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const getWeatherData = async () => {
    setLoading(true);
    try {
      // Fetch Current Weather
      const weatherRes = await fetch(
        `${WEATHER_API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!weatherRes.ok) throw new Error('City not found');
      const weatherData = await weatherRes.json();

      // Fetch Forecast
      const forecastRes = await fetch(
        `${FORECAST_API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!forecastRes.ok) throw new Error('Forecast not found');
      const forecastData = await forecastRes.json();

      // Process forecast to get daily readings (around noon)
      const dailyForecast = forecastData.list.filter((reading) => 
        reading.dt_txt.includes("12:00:00")
      ).slice(0, 5);

      // Find 24h High/Low from the first 8 forecast points
      const next24h = forecastData.list.slice(0, 8);
      const tempMax24h = Math.round(Math.max(...next24h.map(item => item.main.temp)));
      const tempMin24h = Math.round(Math.min(...next24h.map(item => item.main.temp)));

      return {
        city: weatherData.name,
        country: weatherData.sys.country,
        temp: Math.round(weatherData.main.temp),
        tempMin: tempMin24h,
        tempMax: tempMax24h,
        humidity: weatherData.main.humidity,
        feelsLike: Math.round(weatherData.main.feels_like),
        pressure: weatherData.main.pressure,
        windSpeed: Math.round(weatherData.wind.speed * 3.6),
        visibility: Math.round(weatherData.visibility / 1000),
        description: weatherData.weather[0].description,
        main: weatherData.weather[0].main,
        icon: weatherData.weather[0].icon,
        forecast: dailyForecast.map(day => ({
          date: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
          temp: Math.round(day.main.temp),
          main: day.weather[0].main,
          icon: day.weather[0].icon,
          description: day.weather[0].description
        }))
      };
    } catch (error) {
      setError(true);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    if (!city.trim()) return;

    const newInfo = await getWeatherData();
    if (newInfo) {
      update(newInfo);
      setCity('');
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-grp">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search for a city..."
            value={city}
            onChange={handleChange}
            className="search-input"
          />
        </div>
        <button type="submit" disabled={loading} className="search-btn">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <p className="error-msg">City not found. Please try again.</p>}
    </div>
  );
}
