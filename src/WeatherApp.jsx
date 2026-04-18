import { useState, useEffect } from 'react';
import Searchbox from './Searchbox.jsx';
import InfoBox from './infoBox.jsx';
import WeatherStats from './WeatherStats.jsx';
import ForecastSection from './ForecastSection.jsx';
import './App.css';

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDefaultWeather = async () => {
    const API_KEY = 'f44d1070acc104cbef2ded0fb8153cf9';
    const city = 'Bengaluru';
    try {
      const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const weatherData = await weatherRes.json();
      
      const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
      const forecastData = await forecastRes.json();

      const dailyForecast = forecastData.list.filter(f => f.dt_txt.includes("12:00:00")).slice(0, 5);
      const next24h = forecastData.list.slice(0, 8);
      
      setWeather({
        city: weatherData.name,
        country: weatherData.sys.country,
        temp: Math.round(weatherData.main.temp),
        tempMin: Math.round(Math.min(...next24h.map(i => i.main.temp))),
        tempMax: Math.round(Math.max(...next24h.map(i => i.main.temp))),
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
      });
    } catch (e) {
      console.error("Failed to fetch initial weather", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDefaultWeather();
  }, []);

  const update = (newInfo) => {
    setWeather(newInfo);
  };

  const getBackgroundImage = () => {
    const main = weather?.main?.toLowerCase() || 'clear';
    
    const photos = {
      clear: 'https://images.unsplash.com/photo-1504608553035-261899a6d7ec?auto=format&fit=crop&q=80&w=2000',
      clouds: 'https://images.unsplash.com/photo-1483977399921-6cf94f6fdc3a?auto=format&fit=crop&q=80&w=2000',
      rain: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=2000',
      drizzle: 'https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?auto=format&fit=crop&q=80&w=2000',
      thunderstorm: 'https://images.unsplash.com/photo-1605727282300-2438aaac064f?auto=format&fit=crop&q=80&w=2000',
      snow: 'https://images.unsplash.com/photo-1483664852095-da6c403ec152?auto=format&fit=crop&q=80&w=2000',
      mist: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=2000',
      smoke: 'https://images.unsplash.com/photo-1526671310166-51f621763784?auto=format&fit=crop&q=80&w=2000',
      haze: 'https://images.unsplash.com/photo-1526671310166-51f621763784?auto=format&fit=crop&q=80&w=2000',
      dust: 'https://images.unsplash.com/photo-1550133730-692225884964?auto=format&fit=crop&q=80&w=2000',
      fog: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=2000',
    };

    return photos[main] || photos.clear;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading Weather Data...</p>
      </div>
    );
  }

  return (
    <div 
      className="app-container" 
      style={{ backgroundImage: `url(${getBackgroundImage()})` }}
    >
      <div className="bg-overlay"></div>
      <div className="app-wrapper">
        <h1 className="dashboard-title">Weather Dashboard</h1>
        
        <Searchbox update={update} />
        
        {weather && (
          <div className="main-content">
            <InfoBox info={weather} />
            <WeatherStats info={weather} />
            <ForecastSection forecast={weather.forecast} />
          </div>
        )}
      </div>
    </div>
  );
}
