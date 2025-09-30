import { useState, useMemo } from 'react';

/**
 * Custom hook for processing and managing hourly forecast data
 * @param {Object} forecast - The forecast data from the API
 * @returns {Object} - Processed forecast data and helper functions
 */
export const useHourlyForecast = (forecast) => {
	const [selectedDay, setSelectedDay] = useState(0);

	// Group forecast by day
	const dailyForecasts = useMemo(() => {
		if (!forecast || !forecast.list) return [];

		// Group forecast by day
		const groupedForecasts = forecast.list.reduce((acc, item) => {
			const date = new Date(item.dt * 1000);
			const dayKey = date.toDateString();

			if (!acc[dayKey]) {
				acc[dayKey] = {
					date: date,
					weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
					day: date.getDate(),
					month: date.toLocaleDateString('en-US', { month: 'short' }),
					fullDate: date.toLocaleDateString('en-US', { 
						weekday: 'long',
						month: 'short', 
						day: 'numeric' 
					}),
					items: []
				};
			}

			acc[dayKey].items.push(item);
			return acc;
		}, {});

		// Convert to array and limit to 7 days
		return Object.values(groupedForecasts).slice(0, 7);
	}, [forecast]);

	// Get hourly data for selected day
	const hourlyData = useMemo(() => {
		if (!dailyForecasts.length || selectedDay >= dailyForecasts.length) {
			return [];
		}

		// Return first 8 hours of the selected day
		return dailyForecasts[selectedDay].items.slice(0, 8);
	}, [dailyForecasts, selectedDay]);

	// Format time for display (e.g. "3 AM", "12 PM")
	const formatTime = (timestamp) => {
		const date = new Date(timestamp * 1000);
		return date.toLocaleTimeString('en-US', {
			hour: 'numeric',
			hour12: true
		});
	};

	const selectDay = (dayIndex) => {
		setSelectedDay(dayIndex);
	};

	const getDayOptions = useMemo(() => {
		return dailyForecasts.map((day, index) => ({
			value: index,
			label: `${day.weekday}, ${day.month} ${day.day}`,
			fullLabel: day.fullDate
		}));
	}, [dailyForecasts]);

	return {
		dailyForecasts,
		hourlyData,
		selectedDay,
		selectDay,
		formatTime,
		getDayOptions
	};
};