import { useSelector } from 'react-redux';
import { getWeatherIcon } from '../../../utils/getWeatherIcon';
import { useHourlyForecast } from '../../../hooks/useHourlyForecast';
import { useState, useRef } from 'react';
import { useClickOutside } from '../../../hooks/useWindowsClick';
import './HourlyForecast.scss';

const HourlyForecast = () => {
	const { forecast, unit, loading } = useSelector((state) => state.weather);
	const { dailyForecasts, hourlyData, selectedDay, selectDay, formatTime } =
		useHourlyForecast(forecast);
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	useClickOutside(dropdownRef, () => setIsOpen(false));
	const handleDayChange = (e) => {
		selectDay(parseInt(e.target.value));
		setIsOpen(false);
	};

	if (!forecast) return null;

	return (
		<aside className={'hourly-forecast'}>
			<header className={'hourly-forecast__header'}>
				<h2 className={'hourly-forecast__title'}>Hourly Forecast</h2>
				<div
					className={'hourly-forecast__dropdown'}
					ref={dropdownRef}>
					<span
						className={'hourly-forecast__dropdown-toggle-btn'}
						onClick={() => setIsOpen(!isOpen)}>
						<p>
							{loading
								? '-'
								: dailyForecasts[selectedDay].weekday}
						</p>
						<img
							src={'/assets/images/icon-dropdown.svg'}
							alt={'Arrow'}
							className={isOpen ? 'flip' : 'flip-back'}
						/>
					</span>

					<ul
						className={`hourly-forecast__dropdown-menu ${
							isOpen ? 'open' : ''
						}`}
						onClick={handleDayChange}>
						{dailyForecasts.map((day, index) => (
							<li
								className={'hourly-forecast__dropdown-option'}
								key={index.toString()}
								value={index}>
								{day.weekday}
							</li>
						))}
					</ul>
				</div>
			</header>

			<ul className={'hourly-forecast__list'}>
				{hourlyData.map((hour, index) => {
					const time = formatTime(hour.dt);
					const icon = getWeatherIcon(hour.weather[0].description);

					return (
						<li
							className={'hourly-forecast__item'}
							key={index}>
							<div className={'hourly-forecast__item-icon-time'}>
								<span className={'hourly-forecast__item-icon'}>
									{loading ? (
										<div className='hourly-forecast__skeleton-icon' />
									) : (
										<img
											src={icon}
											alt={hour.weather[0].description}
										/>
									)}
								</span>

								<span className={'hourly-forecast__item-time'}>
									{loading ? ' ' : time}
								</span>
							</div>
							<span className={'hourly-forecast__item-temp'}>
								{loading
									? ' '
									: `${Math.round(hour.main.temp)}°`}
								{loading ? ' ' : unit === 'metric' ? 'C' : 'F'}
							</span>
						</li>
					);
				})}
			</ul>
		</aside>
	);
};

export default HourlyForecast;

