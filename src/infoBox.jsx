import { MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import './infoBox.css';

export default function InfoBox({ info }) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <motion.div 
      className="main-display"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-card hero-card">
        <div className="location-info">
          <div className="city-name">
            <MapPin size={24} className="accent-icon" />
            <h1>{info.city}, {info.country}</h1>
          </div>
          <div className="date-info">
            <Calendar size={18} />
            <span>{currentDate}</span>
          </div>
        </div>

        <div className="weather-main">
          <div className="temp-section">
            <span className="current-temp">{info.temp}&deg;</span>
            <div className="hi-low">
              <span>H: {info.tempMax}&deg;</span>
              <span>L: {info.tempMin}&deg;</span>
            </div>
          </div>
          <div className="condition-section">
            <img 
              src={`https://openweathermap.org/img/wn/${info.icon}@4x.png`} 
              alt={info.description}
              className="main-weather-icon"
            />
            <span className="weather-condition">{info.description}</span>
          </div>
        </div>
        
        <div className="feels-like">
          Feels like <strong>{info.feelsLike}&deg;C</strong>
        </div>
      </div>
    </motion.div>
  );
}
