import { motion } from 'framer-motion';

export default function ForecastSection({ forecast }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1 }
  };

  return (
    <div className="forecast-container">
      <h3 className="section-title">5-Day Forecast</h3>
      <motion.div 
        className="forecast-list"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {forecast.map((day, index) => (
          <motion.div key={index} className="glass-card forecast-card" variants={item}>
            <span className="forecast-day">{day.date}</span>
            <img 
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} 
              alt={day.description}
              className="forecast-icon"
            />
            <span className="forecast-temp">{day.temp}&deg;</span>
            <span className="forecast-desc">{day.description}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
