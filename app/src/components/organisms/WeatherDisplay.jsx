import React from 'react';
import './WeatherDisplay.scss';

const WeatherDisplay = ({ weather, unit }) => {
	const temperature = Math.round(weather.main.temp);
	const feelsLike = Math.round(weather.main.feels_like);
	const humidity = weather.main.humidity;
	const windSpeed = weather.wind.speed;
	const description = weather.weather[0].description;
	const icon = weather.weather[0].icon;

	return (
		<div className='weather-display'>
			<div className='weather-display__main'>
				<div className='weather-display__icon'>
					<img
						src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
						alt={description}
					/>
				</div>
				<div className='weather-display__temperature'>
					{temperature}°{unit === 'metric' ? 'C' : 'F'}
				</div>
				<div className='weather-display__description'>
					{description}
				</div>
			</div>

			<div className='weather-display__details'>
				<div className='weather-detail'>
					<div className='weather-detail__label'>Feels Like</div>
					<div className='weather-detail__value'>
						{feelsLike}°{unit === 'metric' ? 'C' : 'F'}
					</div>
				</div>

				<div className='weather-detail'>
					<div className='weather-detail__label'>Humidity</div>
					<div className='weather-detail__value'>{humidity}%</div>
				</div>

				<div className='weather-detail'>
					<div className='weather-detail__label'>Wind</div>
					<div className='weather-detail__value'>
						{windSpeed} {unit === 'metric' ? 'm/s' : 'mph'}
					</div>
				</div>
			</div>
		</div>
	);
};

export default WeatherDisplay;
