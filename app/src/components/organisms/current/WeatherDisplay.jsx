import React from 'react';
import './WeatherDisplay.scss';
import { useSelector } from 'react-redux';
import { getWeatherIcon } from '../../../utils/getWeatherIcon';
import { getCountryName } from '../../../utils/getCountryName';
import { getDateFormat } from '../../../utils/getDateFormat';
import WeatherDetail from './WeatherDetail';
import BouncyDotsLoader from '../../atoms/BouncyDotsLoader';

const WeatherDisplay = () => {
	const weather = useSelector((state) => state.weather.current);
	const { unit, loading } = useSelector((state) => state.weather);

	// Check if we have weather data
	const hasWeatherData = weather && Object.keys(weather).length > 0;

	const temperature = hasWeatherData ? Math.round(weather.main.temp) : null;
	const feelsLike = hasWeatherData
		? Math.round(weather.main.feels_like)
		: null;
	const humidity = hasWeatherData ? weather.main.humidity : null;
	const windSpeed = hasWeatherData ? weather.wind.speed : null;
	const precipitation =
		hasWeatherData && weather.rain && weather.rain['1h']
			? weather.rain['1h']
			: 0;
	const description = hasWeatherData ? weather.weather[0].description : '';
	const icon = hasWeatherData ? getWeatherIcon(description) : '';
	const city = hasWeatherData ? weather.name : '';
	const country = hasWeatherData ? getCountryName(weather.sys.country) : '';
	const date = hasWeatherData ? getDateFormat(weather.dt) : '';

	return (
		<section className='weather-display'>
			{loading ? (
				<article className='weather-display__loading'>
					<BouncyDotsLoader />
					<span>Loading...</span>
				</article>
			) : (
				<div className='weather-display__main'>
					<article className={'weather-display__main-right'}>
						<h2 className='weather-display__city'>
							{`${city}, ${country}`}
						</h2>
						<h3 className='weather-display__date'>{date}</h3>
					</article>

					<article className={'weather-display__main-left'}>
						<div className='weather-display__icon'>
							<img
								src={icon}
								alt={description}
							/>
						</div>
						<h2 className='weather-display__temperature'>
							{temperature}°{unit === 'metric' ? 'C' : 'F'}
						</h2>
					</article>
				</div>
			)}

			<div className='weather-display__details'>
				<WeatherDetail
					label={'Feels Like'}
					value={`${feelsLike}°${unit === 'metric' ? 'C' : 'F'}`}
				/>
				<WeatherDetail
					label={'Humidity'}
					value={`${humidity}%`}
				/>
				<WeatherDetail
					label={'Wind Speed'}
					value={`${windSpeed} ${unit === 'metric' ? 'km/h' : 'mph'}`}
				/>
				<WeatherDetail
					label={'Precipitation'}
					value={`${precipitation} ${
						unit === 'metric' ? 'mm' : 'in'
					}`}
				/>
			</div>
		</section>
	);
};

export default WeatherDisplay;

