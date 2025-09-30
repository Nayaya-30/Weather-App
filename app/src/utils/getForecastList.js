const getForecastList = (forecast) => {
    // Validate input
    if (!forecast || !Array.isArray(forecast.list)) {
        return [];
    }
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
        .slice(0, 7) // Get only 7 days
        .map(([day, items]) => {
            const date = new Date(items[0].dt * 1000);
            const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
            const dayOfMonth = date.getDate();

            return {
                weekday,
                day: dayOfMonth,
                tempMax: Math.round(Math.max(...items.map(item => item.main.temp_max))),
                tempMin: Math.round(Math.min(...items.map(item => item.main.temp_min))),
                description: items[0].weather[0].description
            };
        });

    return dailyForecastList;
};

export { getForecastList };