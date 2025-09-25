export function getDateFormat(timestamp, format) {
  if (!timestamp) return '';

  const date = new Date(timestamp * 1000); // timestamp is in seconds

  const options = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  };

  return new Intl.DateTimeFormat(format, options).format(date);
}
