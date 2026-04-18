import { Droplets, Wind, Gauge, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WeatherStats({ info }) {
  const stats = [
    { label: 'Humidity', value: `${info.humidity}%`, icon: Droplets, color: '#3b82f6' },
    { label: 'Wind Speed', value: `${info.windSpeed} km/h`, icon: Wind, color: '#10b981' },
    { label: 'Pressure', value: `${info.pressure} hPa`, icon: Gauge, color: '#f59e0b' },
    { label: 'Visibility', value: `${info.visibility} km`, icon: Eye, color: '#8b5cf6' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="stats-grid"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {stats.map((stat, index) => (
        <motion.div key={index} className="glass-card stat-item" variants={item}>
          <div className="stat-icon-wrapper" style={{ backgroundColor: `${stat.color}20` }}>
            <stat.icon size={22} color={stat.color} />
          </div>
          <div className="stat-info">
            <span className="stat-label">{stat.label}</span>
            <span className="stat-value">{stat.value}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
