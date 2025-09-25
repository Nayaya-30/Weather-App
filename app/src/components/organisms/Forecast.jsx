import React from 'react';
import './Forecast.scss';

const Forecast = ({ forecast, unit }) => {
  // Group forecast by day
  const dailyForecasts = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toDateString();
    
    if (!acc[day]) {
      acc[day] = [];
    }
    
    acc[day].push(item);
    return acc;
  }, {});

  // Get one forecast per day (the first one)
  const dailyForecastList = Object.entries(dailyForecasts)
    .slice(0, 5) // Get only 5 days
    .map(([day, items]) => {
      const date = new Date(items[0].dt * 1000);
      const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayOfMonth = date.getDate();
      
      return {
        weekday,
        day: dayOfMonth,
        tempMax: Math.round(Math.max(...items.map(item => item.main.temp_max))),
        tempMin: Math.round(Math.min(...items.map(item => item.main.temp_min))),
        icon: items[0].weather[0].icon,
        description: items[0].weather[0].description
      };
    });

  return (
    <div className="forecast">
      <h2 className="forecast__title">5-Day Forecast</h2>
      <div className="forecast__list">
        {dailyForecastList.map((day, index) => (
          <div className="forecast-day" key={index}>
            <div className="forecast-day__date">
              <div className="forecast-day__weekday">{day.weekday}</div>
              <div className="forecast-day__day">{day.day}</div>
            </div>
            <div className="forecast-day__icon">
              <img 
                src={`https://openweathermap.org/img/wn/${day.icon}.png`} 
                alt={day.description}
              />
            </div>
            <div className="forecast-day__temps">
              <span className="forecast-day__temp-max">
                {day.tempMax}°{unit === 'metric' ? 'C' : 'F'}
              </span>
              <span className="forecast-day__temp-min">
                {day.tempMin}°{unit === 'metric' ? 'C' : 'F'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;