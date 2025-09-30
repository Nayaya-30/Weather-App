import { useSelector } from 'react-redux';
import { getForecastList } from '../../../utils/getForecastList';
import { getWeatherIcon } from '../../../utils/getWeatherIcon';
import './Forecast.scss';

const Forecast = () => {
	const { forecast, unit, loading } = useSelector((state) => state.weather);

	const dailyForecastList = getForecastList(forecast);

	return (
		<section className='forecast'>
			<h2 className='forecast__title'>Daily Forecast</h2>

			<div className='forecast__list'>
				{dailyForecastList.map((day, index) => {
					const icon = getWeatherIcon(day.description);

					return (
						<article
							className='forecast-day'
							key={index.toString()}>
							<div className='forecast-day__date'>
								<div className='forecast-day__weekday'>
									{loading ? ' ' : day.weekday}
								</div>
							</div>

							<div className='forecast-day__icon'>
								{loading ? (
									<div className='forecast-day__skeleton-icon' />
								) : (
									<img
										src={icon}
										alt={day.description}
									/>
								)}
							</div>

							<div className='forecast-day__temps'>
								<span className='forecast-day__temp-max'>
									{loading ? ' ' : `${day.tempMax}°`}
									{loading
										? ' '
										: unit === 'metric'
										? 'C'
										: 'F'}
								</span>
								<span className='forecast-day__temp-min'>
									{loading ? ' ' : `${day.tempMin}°`}
									{loading
										? ' '
										: unit === 'metric'
										? 'C'
										: 'F'}
								</span>
							</div>
						</article>
					);
				})}
			</div>
		</section>
	);
};

export default Forecast;

