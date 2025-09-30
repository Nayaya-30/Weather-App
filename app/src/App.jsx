import React, { useEffect, useRef } from 'react';
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
	const { current, forecast, error, unit, theme } = useSelector(
		(state) => state.weather
	);

	// This is used to prevent unnecessary API calls when the user changes the unit
	const lastLoadedCity = useRef(null);
	const lastLoadedUnit = useRef(null);

	// This fetches weather data for a default city (Akwanga)
	useEffect(() => {
		// Determine which city to load
		const cityToLoad = current?.name || 'Akwanga';

		// Only fetch if we haven't already loaded this city with this unit
		if (
			cityToLoad !== lastLoadedCity.current ||
			unit !== lastLoadedUnit.current
		) {
			dispatch(fetchWeather({ city: cityToLoad, units: unit }));
			dispatch(fetchForecast({ city: cityToLoad, units: unit }));
			lastLoadedCity.current = cityToLoad;
			lastLoadedUnit.current = unit;
		}
	}, [unit, dispatch, current]);

	// This handles city search
	const handleSearch = (city) => {
		if (city) {
			dispatch(clearError());
			dispatch(fetchWeather({ city, units: unit }));
			dispatch(fetchForecast({ city, units: unit }));
			lastLoadedCity.current = city;
			lastLoadedUnit.current = unit;
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
			lastLoadedCity.current = current.name;
			lastLoadedUnit.current = unit;
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

			{!error && <SearchBar onSearch={handleSearch} />}

			{error && (
				<ErrorMessage
					message={error}
					onRetry={handleRetry}
				/>
			)}

			{forecast && !error && (
				<section className='weather-section'>
					<div className='weather-main'>
						<WeatherDisplay />

						<Forecast />
					</div>

					<HourlyForecast />
				</section>
			)}
		</main>
	);
}

export default App;

