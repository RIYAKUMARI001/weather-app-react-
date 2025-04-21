import { useState } from 'react';
import Searchbox from './Searchbox.jsx';
import InfoBox from './infoBox.jsx';

export default function WeatherApp() {
  const [weather, setWeather] = useState({
    city: 'Bengaluru',
    feelsLike: 23.55,
    humidity: 47,
    temp: 23.88,
    tempMax: 23.88,
    tempMin: 23.88,
    weather: 'broken clouds',
  });

  const update = (newInfo) => {
    setWeather(newInfo);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ color: 'blue' }}>Weather App</h2>
      <Searchbox update={update} />
      <InfoBox info={weather} />
    </div>
  );
}
