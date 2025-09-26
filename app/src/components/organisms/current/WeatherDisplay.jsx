import React from 'react';
import './WeatherDisplay.scss';
import { useSelector } from 'react-redux';
import { getWeatherIcon } from '../../../utils/getWeatherIcon';
import { getCountryName } from '../../../utils/getCountryName';
import { getDateFormat } from '../../../utils/getDateFormat';
import WeatherDetail from './WeatherDetail';

const WeatherDisplay = () => {
	const weather = useSelector((state) => state.weather.current);
	const unit = useSelector((state) => state.weather.unit);

	const temperature = Math.round(weather.main.temp);
	const feelsLike = Math.round(weather.main.feels_like);
	const humidity = weather.main.humidity;
	const windSpeed = weather.wind.speed;
	const precipitation =
		weather.rain && weather.rain['1h'] ? weather.rain['1h'] : 0;
	const description = weather.weather[0].description;
	const icon = getWeatherIcon(description);
	const city = weather.name;
	const country = getCountryName(weather.sys.country);
	const date = getDateFormat(weather.dt);

	return (
		<section className='weather-display'>
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

