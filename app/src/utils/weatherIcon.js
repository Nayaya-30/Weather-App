export function getWeatherIcon(description) {
  if (!description) return '/assets/images/icon-fog.webp';

  const desc = description.toLowerCase().trim();

  const conditions = [
    { keywords: ['clear'], icon: '/assets/images/icon-sunny.webp' },
    { keywords: ['thunder', 'storm'], icon: '/assets/images/icon-storm.webp' },
    { keywords: ['snow'], icon: '/assets/images/icon-snow.webp' },
    { keywords: ['rain', 'shower'], icon: '/assets/images/icon-rain.webp' },
    { keywords: ['overcast', 'broken'], icon: '/assets/images/icon-overcast.webp' },
    { keywords: ['few', 'scattered', 'partly'], icon: '/assets/images/icon-partly-cloudy.webp' },
    { keywords: ['drizzle'], icon: '/assets/images/icon-drizzle.webp' },
    { keywords: ['mist', 'fog', 'haze'], icon: '/assets/images/icon-fog.webp' }
  ];

  return (
    conditions.find(condition => condition.keywords.some(k => desc.includes(k)))?.icon
  );
}
