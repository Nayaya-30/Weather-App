import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchWeather,
	fetchForecast,
	toggleTheme,
	setUnit,
	clearError,
} from './slices/weatherSlice';
import Header from './components/molecules/Header';
import SearchBar from './components/atoms/SearchBar';
import WeatherDisplay from './components/organisms/current/WeatherDisplay';
import Forecast from './components/organisms/forecast/Forecast';
import HourlyForecast from './components/organisms/forecast/HourlyForecast';
import ThemeToggle from './components/atoms/ThemeToggle';
import UnitToggle from './components/atoms/UnitToggle';
import LoadingSpinner from './components/atoms/LoadingSpinner';
import ErrorMessage from './components/atoms/ErrorMessage';
import './App.css';

function App() {
	const dispatch = useDispatch();
	const { current, forecast, loading, error, unit, theme } = useSelector(
		(state) => state.weather
	);

	// This fetches weather data for a default city (Akwanga)
	useEffect(() => {
		dispatch(fetchWeather({ city: 'Akwanga', units: unit }));
		dispatch(fetchForecast({ city: 'Akwanga', units: unit }));
	}, [dispatch, unit]);

	// This handles city search
	const handleSearch = (city) => {
		if (city) {
			dispatch(clearError());
			dispatch(fetchWeather({ city, units: unit }));
			dispatch(fetchForecast({ city, units: unit }));
		}
	};

	const handleToggleTheme = () => {
		dispatch(toggleTheme());
	};

	const handleUnitToggle = (newUnit) => {
		dispatch(setUnit(newUnit));
	};

	const handleRetry = () => {
		dispatch(clearError());
		if (current) {
			dispatch(fetchWeather({ city: current.name, units: unit }));
			dispatch(fetchForecast({ city: current.name, units: unit }));
		}
	};

	return (
		<main className={`app ${theme}`}>
			<Header>
				<ThemeToggle
					onToggle={handleToggleTheme}
					theme={theme}
				/>
				<UnitToggle
					unit={unit}
					onToggle={handleUnitToggle}
				/>
			</Header>

			<div className={''}>
				<SearchBar onSearch={handleSearch} />
			</div>

			{loading && <LoadingSpinner />}

			{error && (
				<ErrorMessage
					message={error}
					onRetry={handleRetry}
				/>
			)}

			<section className='weather-section'>
				<div className='weather-main'>
					{current && !loading && <WeatherDisplay />}

					{forecast && !loading && <Forecast />}
				</div>

				{forecast && !loading && <HourlyForecast />}
			</section>
		</main>
	);
}

export default App;

