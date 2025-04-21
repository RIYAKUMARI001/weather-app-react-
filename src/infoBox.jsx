import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './infoBox.css';

export default function InfoBox({ info }) {
  const INIT_URL =
    'https://images.unsplash.com/photo-1714417830767-79dc641c6e65?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJva2VuJTIwY2xvdWRzfGVufDB8fDB8fHww';

  return (
    <div className="infoBox">
      <div className="card-container">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={INIT_URL}
            title="Weather Image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {info.city}
            </Typography>
            <Typography variant="body2" color="text.secondary" component={'div'}>
              <div className='weather-details'>
              <div>Temp: {info.temp}&deg;C</div>
              <div>Feels Like: {info.feelsLike}</div>
              <div>Humidity: {info.humidity}%</div>
              <div>Weather: {info.weather}</div>
              </div>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
